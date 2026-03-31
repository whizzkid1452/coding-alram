// ===================== 상태 관리 =====================
const state = {
  alarms: JSON.parse(localStorage.getItem("alarms") || "[]"),
  currentScreen: "main",
  activeAlarm: null,
  activeProblem: null,
  timerInterval: null,
  elapsedSeconds: 0,
  hintIndex: 0,
  showHint: false,
  alarmInterval: null,
  alarmAudio: null,
};

function saveAlarms() {
  localStorage.setItem("alarms", JSON.stringify(state.alarms));
}

// ===================== 화면 전환 =====================
function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(`screen-${name}`)?.classList.add("active");

  document.querySelector(".ringing-overlay")?.classList.remove("active");
  document.querySelector(".solved-screen")?.classList.remove("active");

  state.currentScreen = name;
}

// ===================== 랜덤 문제 선택 =====================
function getRandomProblem() {
  return PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
}

// ===================== 메인 화면: 알람 목록 =====================
function renderAlarmList() {
  const list = document.getElementById("alarm-list");
  if (state.alarms.length === 0) {
    list.innerHTML = `
      <div class="alarm-empty">
        <div class="icon">&#9200;</div>
        <p>알람이 없습니다</p>
        <p style="font-size:13px;margin-top:8px">+ 버튼을 눌러 코테 알람을 추가하세요</p>
      </div>`;
    return;
  }

  list.innerHTML = state.alarms
    .map(
      (alarm, i) => `
    <div class="alarm-card ${alarm.enabled ? "" : "disabled"}">
      <div>
        <div class="alarm-time">${formatTime(alarm.hour, alarm.minute)}</div>
        <div class="alarm-meta">
          <span class="alarm-label">${alarm.label}</span>
          <span class="alarm-repeat">${getRepeatText(alarm.days)}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px">
        <label class="toggle">
          <input type="checkbox" ${alarm.enabled ? "checked" : ""} onchange="toggleAlarm(${i})">
          <span class="slider"></span>
        </label>
        <button class="btn-delete" onclick="deleteAlarm(${i})">&#10005;</button>
      </div>
    </div>`
    )
    .join("");
}

function formatTime(h, m) {
  const period = h < 12 ? "오전" : "오후";
  const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${period} ${dh}:${String(m).padStart(2, "0")}`;
}

function getRepeatText(days) {
  if (!days || days.length === 0) return "한 번만";
  const names = ["일", "월", "화", "수", "목", "금", "토"];
  const sorted = [...days].sort();
  if (JSON.stringify(sorted) === "[1,2,3,4,5]") return "평일";
  if (JSON.stringify(sorted) === "[0,6]") return "주말";
  if (sorted.length === 7) return "매일";
  return sorted.map((d) => names[d]).join(", ");
}

function toggleAlarm(index) {
  state.alarms[index].enabled = !state.alarms[index].enabled;
  saveAlarms();
  scheduleAllAlarms();
  renderAlarmList();
}

function deleteAlarm(index) {
  state.alarms.splice(index, 1);
  saveAlarms();
  scheduleAllAlarms();
  renderAlarmList();
}

// ===================== 알람 추가 화면 =====================
function openAddAlarm() {
  showScreen("add");
  document.getElementById("inp-hour").value = "07";
  document.getElementById("inp-minute").value = "00";
  document.getElementById("inp-label").value = "코테 알람";

  // 요일 초기화
  document.querySelectorAll(".day-btn").forEach((b) => b.classList.remove("selected"));
}

function toggleDay(btn) {
  btn.classList.toggle("selected");
}

function quickSelectDays(type) {
  const btns = document.querySelectorAll(".day-btn");
  btns.forEach((b) => b.classList.remove("selected"));

  let indices = [];
  if (type === "weekday") indices = [1, 2, 3, 4, 5];
  else if (type === "weekend") indices = [0, 6];
  else if (type === "everyday") indices = [0, 1, 2, 3, 4, 5, 6];

  indices.forEach((i) => btns[i].classList.add("selected"));
}

function saveAlarm() {
  const hour = parseInt(document.getElementById("inp-hour").value) || 0;
  const minute = parseInt(document.getElementById("inp-minute").value) || 0;
  const label = document.getElementById("inp-label").value || "코테 알람";

  const days = [];
  document.querySelectorAll(".day-btn.selected").forEach((b) => {
    days.push(parseInt(b.dataset.day));
  });

  state.alarms.push({
    id: Date.now(),
    hour: Math.min(23, Math.max(0, hour)),
    minute: Math.min(59, Math.max(0, minute)),
    label,
    days,
    enabled: true,
  });

  saveAlarms();
  scheduleAllAlarms();
  renderAlarmList();
  showScreen("main");
}

// ===================== 알람 스케줄링 =====================
let alarmCheckInterval = null;

function scheduleAllAlarms() {
  if (alarmCheckInterval) clearInterval(alarmCheckInterval);

  alarmCheckInterval = setInterval(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const dayOfWeek = now.getDay();

    if (s !== 0) return;

    state.alarms.forEach((alarm) => {
      if (!alarm.enabled) return;
      if (alarm.hour !== h || alarm.minute !== m) return;
      if (alarm.days.length > 0 && !alarm.days.includes(dayOfWeek)) return;

      triggerAlarm(alarm);
    });
  }, 1000);
}

// ===================== 알람 울리기 =====================
function triggerAlarm(alarm) {
  state.activeAlarm = alarm;
  state.activeProblem = getRandomProblem();

  startAlarmSound();

  const overlay = document.querySelector(".ringing-overlay");
  overlay.classList.add("active");

  const now = new Date();
  document.getElementById("ringing-time").textContent = formatTime(now.getHours(), now.getMinutes());
  document.getElementById("ringing-label").textContent = alarm.label;
}

function startAlarmSound() {
  stopAlarmSound();

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    state.alarmAudio = ctx;

    function beep() {
      if (!state.alarmAudio) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "square";
      gain.gain.value = 0.3;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.stop(ctx.currentTime + 0.5);
    }

    beep();
    state.alarmInterval = setInterval(beep, 1500);
  } catch (e) {
    console.log("오디오 재생 실패:", e);
  }
}

function stopAlarmSound() {
  if (state.alarmInterval) {
    clearInterval(state.alarmInterval);
    state.alarmInterval = null;
  }
  if (state.alarmAudio) {
    state.alarmAudio.close();
    state.alarmAudio = null;
  }
}

function startSolving() {
  document.querySelector(".ringing-overlay").classList.remove("active");
  openProblemScreen();
}

// ===================== 즉시 테스트 =====================
function quickTest() {
  state.activeProblem = getRandomProblem();
  state.activeAlarm = { label: "테스트" };
  openProblemScreen();
}

// ===================== 문제 풀기 화면 =====================
function openProblemScreen() {
  showScreen("problem");

  const p = state.activeProblem;
  state.elapsedSeconds = 0;
  state.hintIndex = 0;
  state.showHint = false;

  // 타이머
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.elapsedSeconds++;
    document.getElementById("timer").textContent = formatTimer(state.elapsedSeconds);
  }, 1000);

  // 백준 번호
  document.getElementById("problem-id").textContent = `BOJ ${p.id}`;

  // 문제 내용
  document.getElementById("problem-title").textContent = p.title;
  document.getElementById("problem-desc").textContent = p.description;

  // 예제
  const examplesHtml = p.testCases
    .slice(0, 2)
    .map(
      (tc, i) => `
    <div class="example-box">
      <div class="example-label">입력 ${i + 1}</div>
      <div class="example-code">${escapeHtml(tc.input)}</div>
    </div>
    <div class="example-box">
      <div class="example-label">출력 ${i + 1}</div>
      <div class="example-code">${escapeHtml(tc.output)}</div>
    </div>`
    )
    .join("");
  document.getElementById("examples").innerHTML = examplesHtml;

  // 힌트 초기화
  document.getElementById("hint-area").style.display = "none";

  // 코드 에디터
  document.getElementById("code-editor").value = p.starter || "";

  // 결과 초기화
  document.getElementById("results").innerHTML = "";
  document.getElementById("results").style.display = "none";

}

function formatTimer(s) {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 힌트
function revealHint() {
  state.showHint = true;
  renderHint();
}

function nextHint() {
  if (state.hintIndex < state.activeProblem.hints.length - 1) {
    state.hintIndex++;
    renderHint();
  }
}

function renderHint() {
  const area = document.getElementById("hint-area");
  const p = state.activeProblem;
  if (!state.showHint || !p.hints.length) {
    area.style.display = "none";
    return;
  }

  area.style.display = "block";
  area.innerHTML = `
    <div class="hint-box">
      <div class="hint-title">&#128161; 힌트 ${state.hintIndex + 1} / ${p.hints.length}</div>
      <div class="hint-text">${escapeHtml(p.hints[state.hintIndex])}</div>
      ${
        state.hintIndex < p.hints.length - 1
          ? `<button class="btn-hint-more" onclick="nextHint()">다음 힌트 보기 &rarr;</button>`
          : ""
      }
    </div>`;
}

// ===================== 코드 실행 & 채점 =====================
function submitCode() {
  const code = document.getElementById("code-editor").value;
  const p = state.activeProblem;
  const resultsEl = document.getElementById("results");
  resultsEl.style.display = "block";

  const results = p.testCases.map((tc, i) => {
    return runCode(code, tc.input, tc.output, i + 1);
  });

  resultsEl.innerHTML = results
    .map(
      (r) => `
    <div class="result-item">
      <span class="result-icon">${r.passed ? "&#9989;" : "&#10060;"}</span>
      <div>
        <div>테스트 ${r.index} - ${r.passed ? "통과" : "실패"}</div>
        ${
          !r.passed
            ? `<div class="result-detail ${r.error ? "result-error" : ""}">
            ${r.error ? "오류: " + escapeHtml(r.error) : "출력: " + escapeHtml(r.output || "(없음)") + "<br>정답: " + escapeHtml(r.expected)}
          </div>`
            : ""
        }
      </div>
    </div>`
    )
    .join("");

  if (results.every((r) => r.passed)) {
    clearInterval(state.timerInterval);
    stopAlarmSound();
    setTimeout(() => showSolvedScreen(), 800);
  }

}

function runCode(code, input, expectedOutput, index) {
  try {
    const wrapped = new Function(
      "input",
      "console",
      `
      const __output = [];
      const console = { log: function() {
        __output.push(Array.from(arguments).join(' '));
      }};
      const print = function() {
        __output.push(Array.from(arguments).join(' '));
      };
      ${code}
      return __output.join('\\n');
    `
    );

    const result = wrapped(input.trim(), {});
    const actual = (result || "").trim();
    const expected = expectedOutput.trim();

    return {
      index,
      passed: actual === expected,
      output: actual,
      expected,
      error: null,
    };
  } catch (e) {
    return {
      index,
      passed: false,
      output: "",
      expected: expectedOutput.trim(),
      error: e.message,
    };
  }
}

// ===================== 정답 화면 =====================
function showSolvedScreen() {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const solved = document.querySelector(".solved-screen");
  solved.classList.add("active");

  document.getElementById("solved-problem").textContent = `BOJ ${state.activeProblem.id} - ${state.activeProblem.title}`;
  document.getElementById("solved-time").textContent = formatTimer(state.elapsedSeconds);
}

function dismissAlarm() {
  stopAlarmSound();

  if (state.activeAlarm?.id) {
    const alarm = state.alarms.find((a) => a.id === state.activeAlarm.id);
    if (alarm && (!alarm.days || alarm.days.length === 0)) {
      alarm.enabled = false;
      saveAlarms();
    }
  }

  state.activeAlarm = null;
  state.activeProblem = null;
  if (state.timerInterval) clearInterval(state.timerInterval);

  renderAlarmList();
  showScreen("main");
}

// ===================== 초기화 =====================
document.addEventListener("DOMContentLoaded", () => {
  // 코드 에디터 탭 키 지원
  const editor = document.getElementById("code-editor");
  if (editor) {
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + "  " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
      }
    });
  }

  // 스플릿 뷰 드래그 디바이더
  const divider = document.getElementById("split-divider");
  if (divider) {
    let dragging = false;
    const splitView = divider.parentElement;
    const leftPanel = divider.previousElementSibling;

    const onMove = (clientX, clientY) => {
      if (!dragging) return;
      const isMobile = window.innerWidth <= 768;
      const rect = splitView.getBoundingClientRect();

      if (isMobile) {
        const pct = ((clientY - rect.top) / rect.height) * 100;
        leftPanel.style.height = Math.max(20, Math.min(80, pct)) + "%";
      } else {
        const pct = ((clientX - rect.left) / rect.width) * 100;
        leftPanel.style.width = Math.max(20, Math.min(80, pct)) + "%";
      }
    };

    divider.addEventListener("mousedown", () => { dragging = true; divider.classList.add("dragging"); });
    divider.addEventListener("touchstart", () => { dragging = true; divider.classList.add("dragging"); });
    window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
    window.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener("mouseup", () => { dragging = false; divider.classList.remove("dragging"); });
    window.addEventListener("touchend", () => { dragging = false; divider.classList.remove("dragging"); });
  }

  renderAlarmList();
  scheduleAllAlarms();
});
