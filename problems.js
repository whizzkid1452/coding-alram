const PROBLEMS = [
    {
      id: 14912,
      title: "숫자 빈도수",
      description: `자연수 N과 한 자리 숫자 d가 주어진다. 1부터 N까지의 자연수에서 숫자 d가 나타나는 횟수를 출력하시오.

【입력】
첫째 줄에 N과 d가 주어진다. (1 ≤ N ≤ 100,000, 0 ≤ d ≤ 9)

【출력】
1부터 N까지에서 숫자 d가 나타나는 횟수를 출력한다.`,
      testCases: [
        { input: "20 5", output: "2" },
        { input: "100 0", output: "11" },
      ],
      hints: [
        "1부터 N까지 반복하면서 각 숫자를 문자열로 바꿔보세요",
        "split(d)하면 d가 몇 번 등장하는지 알 수 있어요",
        "String(i).split(d).length - 1 이 i에서 d의 등장 횟수입니다",
        "for문으로 1~N 돌면서 각각의 등장 횟수를 count에 누적하세요",
        "최종 코드: let count=0; for(let i=1;i<=N;i++) count += String(i).split(d).length-1; console.log(count)",
      ],
      solution: `const [N, d] = input.split(' ');
let count = 0;
for (let i = 1; i <= Number(N); i++) {
  count += String(i).split(d).length - 1;
}
console.log(count);`,
      starter: `const [N, d] = input.split(' ');\n\n`,
    },
    {
      id: 1475,
      title: "방 번호",
      description: `다솜이는 은진이의 옆집에 새로 이사왔다. 다솜이는 자기 방 번호를 플라스틱 숫자로 문에 붙이려고 한다.
숫자 세트는 0~9 숫자가 하나씩 들어있다. 6과 9는 뒤집어서 서로 대체할 수 있다.
방 번호가 주어졌을 때, 필요한 세트의 최소 개수를 출력하시오.

【입력】
방 번호 N (1 ≤ N ≤ 1,000,000)

【출력】
필요한 세트의 최소 개수`,
      testCases: [
        { input: "9999", output: "2" },
        { input: "122", output: "2" },
        { input: "12635", output: "1" },
      ],
      hints: [
        "각 숫자의 개수를 세되, 6과 9는 합쳐서 세세요",
        "배열 길이 10짜리를 만들어 각 숫자 빈도를 저장하세요",
        "6과 9를 합친 후 Math.ceil로 2로 나누면 각각에 필요한 세트 수입니다",
        "모든 숫자 빈도 중 최댓값이 필요한 세트 수예요",
        "count[6]=Math.ceil((count[6]+count[9])/2); count[9]=count[6]; 후 Math.max(...count)",
      ],
      solution: `const n = input;
const count = new Array(10).fill(0);
for (const ch of n) count[Number(ch)]++;
count[6] = Math.ceil((count[6] + count[9]) / 2);
count[9] = count[6];
console.log(Math.max(...count));`,
      starter: `const n = input;\n\n`,
    },
    {
      id: 2161,
      title: "카드1",
      description: `N장의 카드가 있다. 각 카드에는 차례로 1부터 N까지 번호가 붙어 있다.
1번 카드가 맨 위에 놓여있다.

동작: 맨 위 카드를 바닥에 버린다. 그 다음 맨 위 카드를 제일 아래로 옮긴다.
카드가 한 장 남을 때까지 반복한다. 버리는 카드를 순서대로 출력하시오.

【입력】
N (1 ≤ N ≤ 1,000)

【출력】
버리는 카드 순서를 한 줄에 출력 (공백 구분)`,
      testCases: [
        { input: "7", output: "1 3 5 7 4 2 6" },
        { input: "4", output: "1 3 4 2" },
      ],
      hints: [
        "배열을 큐처럼 사용하세요 (shift로 앞에서 빼기)",
        "shift → 버리기, shift → push로 뒤로 보내기",
        "카드가 1장 남을 때까지 while문으로 반복하세요",
        "버린 카드를 result 배열에 넣고 마지막에 join(' ')으로 출력",
        "const q=[1..N]; while(q.length>1){result.push(q.shift()); q.push(q.shift());} result.push(q[0])",
      ],
      solution: `const n = Number(input);
const q = [];
for (let i = 1; i <= n; i++) q.push(i);
const result = [];
while (q.length > 1) {
  result.push(q.shift());
  q.push(q.shift());
}
result.push(q[0]);
console.log(result.join(' '));`,
      starter: `const n = Number(input);\n\n`,
    },
    {
      id: 1343,
      title: "폴리오미노",
      description: `'.'과 'X'로 이루어진 보드가 있다.
'X'를 "AAAA" 또는 "BB"로 덮어야 한다 (4칸짜리 또는 2칸짜리).
가능하면 덮은 결과를, 불가능하면 -1을 출력하시오.

【입력】
보드 문자열 (길이 ≤ 50)

【출력】
덮은 결과 문자열 또는 -1`,
      testCases: [
        { input: "XXXXXX", output: "AAAABB" },
        { input: "XX.XX", output: "BB.BB" },
        { input: "XXXX....XXX.", output: "-1" },
        { input: "XX", output: "BB" },
      ],
      hints: [
        "연속된 X의 길이가 홀수면 -1입니다",
        "XXXX → AAAA로 먼저 바꾸고, XX → BB로 바꾸세요",
        "정규식 replace를 반복하면 편합니다",
        "연속 X 그룹별로: 길이%2===1이면 -1, 4로 나눈 몫만큼 AAAA, 나머지/2만큼 BB",
        "board.replace(/X+/g, m => m.length%2 ? null : 'AAAA'.repeat(m.length/4>>0) + 'BB'.repeat(m.length%4/2))",
      ],
      solution: `const board = input;
let fail = false;
const result = board.replace(/X+/g, m => {
  if (m.length % 2 === 1) { fail = true; return m; }
  return 'AAAA'.repeat(Math.floor(m.length / 4)) + 'BB'.repeat((m.length % 4) / 2);
});
console.log(fail ? -1 : result);`,
      starter: `const board = input;\n\n`,
    },
    {
      id: 1769,
      title: "3의 배수",
      description: `양의 정수 X의 각 자릿수를 더한 값이 다시 X가 되는 과정을 반복한다.
최종적으로 한 자리가 되었을 때 그 수가 3의 배수인지 판별하시오.

【입력】
양의 정수 X (1 ≤ X < 10^100, 문자열로 주어짐)

【출력】
첫째 줄에 각 자릿수를 더한 횟수, 둘째 줄에 "YES" 또는 "NO"`,
      testCases: [
        { input: "3", output: "0\nYES" },
        { input: "1234", output: "2\nYES" },
        { input: "10", output: "1\nNO" },
      ],
      hints: [
        "한 자리가 될 때까지 자릿수 합을 반복하세요",
        "마지막 한 자리 수가 3, 6, 9이면 YES",
        "X가 매우 클 수 있으므로 문자열로 처리해야 해요",
        "while(x.length > 1) { x = 자릿수합을 문자열로; count++; }",
        "자릿수 합: x.split('').reduce((s,c)=>s+Number(c),0) 후 String으로 변환",
      ],
      solution: `let x = input;
let count = 0;
while (x.length > 1) {
  x = String(x.split('').reduce((s, c) => s + Number(c), 0));
  count++;
}
console.log(count);
console.log(Number(x) % 3 === 0 ? 'YES' : 'NO');`,
      starter: `let x = input;\n\n`,
    },
    {
      id: 1417,
      title: "국회의원 선거",
      description: `다솜이가 기호 1번으로 출마했다. 다른 후보의 득표수를 하나씩 가져올 수 있다.
다솜이가 이기려면 최소 몇 표를 가져와야 하는지 출력하시오.

【입력】
첫째 줄: 후보 수 N (1 ≤ N ≤ 50)
둘째 줄부터: 각 후보의 득표수 (기호 1번이 첫 번째)

【출력】
매수해야 하는 최소 표 수`,
      testCases: [
        { input: "3\n5\n7\n7", output: "2" },
        { input: "4\n10\n2\n5\n7", output: "0" },
        { input: "1\n5", output: "0" },
      ],
      hints: [
        "다른 후보 중 가장 많은 표를 가진 사람부터 1표씩 빼앗으세요",
        "매번 최대 득표 후보에서 1표 빼고 다솜이에게 1표 추가",
        "while문으로 다솜이가 단독 1위가 될 때까지 반복하세요",
        "후보가 1명이면 답은 0, 아니면 매번 최대값 찾아서 처리",
        "다솜이 votes[0], 나머지 중 max가 votes[0] 이상이면 max에서 -1, votes[0]에 +1, count++",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const votes = [];
for (let i = 1; i <= n; i++) votes.push(Number(lines[i]));
let count = 0;
while (n > 1) {
  const maxOther = Math.max(...votes.slice(1));
  if (votes[0] > maxOther) break;
  const idx = votes.indexOf(maxOther, 1);
  votes[idx]--;
  votes[0]++;
  count++;
}
console.log(count);`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 11576,
      title: "Base Conversion",
      description: `A진법 수를 B진법으로 변환하시오.

【입력】
첫째 줄: A B (2 ≤ A, B ≤ 64)
둘째 줄: A진법 수의 자릿수 m
셋째 줄: A진법 수 (높은 자리부터, 공백 구분)

【출력】
B진법 변환 결과 (높은 자리부터, 공백 구분)`,
      testCases: [
        { input: "10 2\n3\n1 0 0", output: "1 1 0 0 1 0 0" },
        { input: "2 10\n7\n1 1 0 0 1 0 0", output: "1 0 0" },
      ],
      hints: [
        "먼저 10진법으로 변환한 다음, B진법으로 바꾸세요",
        "B진법 변환: 나머지를 역순으로 모으면 됩니다",
        "A진법→10진법: 각 자릿수 × A^(자릿수위치)를 합산",
        "10진법→B진법: while(num>0) { result.unshift(num%B); num=Math.floor(num/B); }",
        "num이 0이면 결과는 [0]으로 처리하세요",
      ],
      solution: `const lines = input.split('\\n');
const [A, B] = lines[0].split(' ').map(Number);
const m = Number(lines[1]);
const digits = lines[2].split(' ').map(Number);
let num = 0;
for (let i = 0; i < m; i++) num = num * A + digits[i];
if (num === 0) { console.log(0); }
else {
  const result = [];
  while (num > 0) { result.unshift(num % B); num = Math.floor(num / B); }
  console.log(result.join(' '));
}`,
      starter: `const lines = input.split('\\n');\nconst [A, B] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 1388,
      title: "바닥 장식",
      description: `방 바닥을 장식하려고 한다. 바닥은 '-'와 '|'로 이루어진 직사각형이다.
'-'는 가로로 연속, '|'는 세로로 연속된 나무판자를 의미한다.
나무판자의 개수를 구하시오.

【입력】
첫째 줄: N M (1 ≤ N, M ≤ 50)
다음 N줄: 바닥 모양

【출력】
나무판자의 개수`,
      testCases: [
        { input: "3 3\n--|\n--|\n--|", output: "5" },
        { input: "1 1\n-", output: "1" },
        { input: "2 2\n-|\n-|", output: "3" },
      ],
      hints: [
        "가로('-')는 왼쪽과 같으면 같은 판자, 다르면 새 판자",
        "세로('|')는 위쪽과 같으면 같은 판자, 다르면 새 판자",
        "각 칸을 순회하면서 새 판자인지 판단하세요",
        "'-'이면 왼쪽이 '-'인지, '|'이면 위쪽이 '|'인지 확인",
        "새 판자 조건: 첫 행/열이거나, 해당 방향의 이전 칸과 다를 때 count++",
      ],
      solution: `const lines = input.split('\\n');
const [N, M] = lines[0].split(' ').map(Number);
const board = [];
for (let i = 1; i <= N; i++) board.push(lines[i]);
let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === '-') {
      if (j === 0 || board[i][j-1] !== '-') count++;
    } else {
      if (i === 0 || board[i-1][j] !== '|') count++;
    }
  }
}
console.log(count);`,
      starter: `const lines = input.split('\\n');\nconst [N, M] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 5635,
      title: "생일",
      description: `반 학생들의 이름과 생일이 주어진다. 가장 나이가 적은 사람과 가장 나이가 많은 사람을 구하시오.

【입력】
첫째 줄: 학생 수 n (1 ≤ n ≤ 100)
다음 n줄: 이름 dd mm yyyy

【출력】
첫째 줄: 가장 나이가 적은 사람 (생일이 가장 늦은 사람)
둘째 줄: 가장 나이가 많은 사람`,
      testCases: [
        {
          input: "3\nMicky 5 7 1990\nAlice 30 12 1992\nTom 15 3 1990",
          output: "Alice\nTom",
        },
      ],
      hints: [
        "날짜를 비교하려면 yyyy*10000 + mm*100 + dd로 숫자화하세요",
        "가장 큰 값이 나이 적은 사람, 가장 작은 값이 나이 많은 사람",
        "각 학생의 이름과 날짜 숫자를 배열로 저장하세요",
        "배열을 날짜 숫자 기준으로 정렬하면 첫번째가 가장 많고 마지막이 가장 적어요",
        "sort((a,b)=>a.date-b.date) 후 마지막이 youngest, 첫번째가 oldest",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const students = [];
for (let i = 1; i <= n; i++) {
  const parts = lines[i].split(' ');
  const name = parts[0];
  const d = Number(parts[1]), m = Number(parts[2]), y = Number(parts[3]);
  students.push({ name, date: y * 10000 + m * 100 + d });
}
students.sort((a, b) => a.date - b.date);
console.log(students[students.length - 1].name);
console.log(students[0].name);`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 1235,
      title: "학생 번호",
      description: `학생 N명의 학번이 주어진다. 각 학번은 최소 k자리이다.
뒤에서 k자리만으로 모든 학생을 구분할 수 있는 최소 k를 구하시오.

【입력】
첫째 줄: N (1 ≤ N ≤ 100)
다음 N줄: 학번 (길이 ≤ 100, 모두 같은 길이)

【출력】
최소 k`,
      testCases: [
        { input: "3\n1212345\n1212356\n1212367", output: "2" },
        { input: "2\n1234\n5678", output: "1" },
      ],
      hints: [
        "k를 1부터 늘려가며, 뒤에서 k자리가 모두 다른지 확인하세요",
        "Set을 사용해서 중복 체크를 하면 편합니다",
        "각 학번의 slice(-k)를 Set에 넣고 크기가 N인지 확인",
        "Set.size === N이면 그 k가 답입니다",
        "for(let k=1;;k++) { const s=new Set(ids.map(id=>id.slice(-k))); if(s.size===N) return k; }",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const ids = [];
for (let i = 1; i <= n; i++) ids.push(lines[i]);
for (let k = 1; ; k++) {
  const s = new Set(ids.map(id => id.slice(-k)));
  if (s.size === n) { console.log(k); break; }
}`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 2535,
      title: "아시아 정보올림피아드",
      description: `대회 참가자들의 성적이 주어진다. 같은 나라에서 최대 2명까지만 수상할 수 있다.
상위 3명(금, 은, 동)을 출력하시오.

【입력】
첫째 줄: 참가 팀 수 N (3 ≤ N ≤ 100)
다음 N줄: 나라번호 학생번호 점수

【출력】
3줄에 걸쳐 금, 은, 동 수상자의 나라번호와 학생번호`,
      testCases: [
        {
          input: "4\n1 1 230\n1 2 210\n2 1 200\n1 3 250",
          output: "1 3\n1 1\n2 1",
        },
      ],
      hints: [
        "점수 내림차순 정렬 후, 나라별 수상자 수를 세세요",
        "같은 나라에서 이미 2명이 수상했으면 건너뛰세요",
        "Map으로 나라별 수상 인원을 추적하세요",
        "정렬 후 순회하면서, 나라카운트 < 2이면 수상자로 선택",
        "3명 선택될 때까지 반복하고 각각 '나라 학생' 출력",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const arr = [];
for (let i = 1; i <= n; i++) {
  const [c, s, p] = lines[i].split(' ').map(Number);
  arr.push({ country: c, student: s, score: p });
}
arr.sort((a, b) => b.score - a.score);
const countMap = {};
let winners = 0;
for (const a of arr) {
  if (winners >= 3) break;
  countMap[a.country] = (countMap[a.country] || 0);
  if (countMap[a.country] < 2) {
    countMap[a.country]++;
    console.log(a.country + ' ' + a.student);
    winners++;
  }
}`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 5800,
      title: "성적 통계",
      description: `각 반의 시험 점수가 주어진다. 각 반의 최대-최소 점수 차이를 구하시오.

【입력】
첫째 줄: 반의 수 K
다음 K줄: 학생 수 N과 점수들

【출력】
각 반마다 "Class X" 와 최고점, 최저점, 차이를 출력`,
      testCases: [
        {
          input: "2\n5 30 25 76 23 78\n4 65 78 55 98",
          output: "Class 1\nMax 78, Min 23, Largest gap 55\nClass 2\nMax 98, Min 55, Largest gap 43",
        },
      ],
      hints: [
        "Math.max, Math.min으로 최대 최소를 구하세요",
        "차이는 max - min 입니다",
        "각 줄의 첫 번째 숫자는 학생 수, 나머지가 점수입니다",
        "split(' ')로 나눈 후 slice(1)로 점수만 추출하세요",
        "점수 배열에 Math.max(...scores), Math.min(...scores) 적용 후 포맷에 맞게 출력",
      ],
      solution: `const lines = input.split('\\n');
const K = Number(lines[0]);
for (let i = 1; i <= K; i++) {
  const nums = lines[i].split(' ').map(Number);
  const scores = nums.slice(1);
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  console.log('Class ' + i);
  console.log('Max ' + max + ', Min ' + min + ', Largest gap ' + (max - min));
}`,
      starter: `const lines = input.split('\\n');\nconst K = Number(lines[0]);\n\n`,
    },
    {
      id: 1337,
      title: "올바른 배열",
      description: `N개의 수가 주어졌을 때, 이 중 연속된 5개의 수가 등차수열을 이루도록 추가해야 하는 수의 최소 개수를 구하시오.

【입력】
첫째 줄: N (1 ≤ N ≤ 50)
다음 N줄: 각 수 (서로 다름, 0 이상 100,000 이하)

【출력】
추가해야 할 최소 수의 개수`,
      testCases: [
        { input: "5\n1\n3\n5\n7\n9", output: "0" },
        { input: "3\n1\n2\n3", output: "2" },
        { input: "1\n1", output: "4" },
      ],
      hints: [
        "정렬 후, 5개씩 묶어서 등차수열이 되는지 확인하세요",
        "두 수 사이의 공차를 구하고, 중간에 빠진 수를 세세요",
        "모든 2개 조합(i,j)에서 공차를 구하고, 5개 등차수열에 포함되는 기존 수를 세세요",
        "공차 d = (arr[j]-arr[i])/(j가 몇번째-i가 몇번째)가 아니라, 모든 가능한 d를 시도",
        "정렬 후 모든 (i,j) 쌍에서 d=(arr[j]-arr[i])/k (k=1..4)로 5개 등차수열 시도, 기존 수 최대 매칭 수 찾기",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const arr = [];
for (let i = 1; i <= n; i++) arr.push(Number(lines[i]));
arr.sort((a, b) => a - b);
const s = new Set(arr);
let maxFound = 1;
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const diff = arr[j] - arr[i];
    for (let pos = 0; pos < 5; pos++) {
      for (let pos2 = pos + 1; pos2 < 5; pos2++) {
        if (diff % (pos2 - pos) !== 0) continue;
        const d = diff / (pos2 - pos);
        const start = arr[i] - d * pos;
        let cnt = 0;
        for (let k = 0; k < 5; k++) {
          if (s.has(start + d * k)) cnt++;
        }
        maxFound = Math.max(maxFound, cnt);
      }
    }
  }
}
console.log(5 - maxFound);`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 25206,
      title: "너의 평점은",
      description: `20줄에 걸쳐 과목명, 학점, 성적이 주어진다. 전공평점을 구하시오.
(학점 × 성적 합) / 총학점. 단 P등급은 제외.

A+ = 4.5, A0 = 4.0, B+ = 3.5, B0 = 3.0, C+ = 2.5, C0 = 2.0,
D+ = 1.5, D0 = 1.0, F = 0.0, P는 계산에서 제외.

【입력】
20줄: 과목명 학점 등급

【출력】
전공평점 (소수점 6자리까지)`,
      testCases: [
        {
          input: "ObjectOrientedProgramming1 3.0 A+\nIntroductiontoComputerEngineering 3.0 A+\nCreativeWriting 1.0 A+\nOCeanography 3.0 A+\nModernKoreanHistory 3.0 A+\nAbcdefg 3.0 A+\nHello 3.0 A+\nWorld 1.0 A+\nFoo 1.0 A+\nBar 1.0 A+\nApple 3.0 A+\nBanana 3.0 A+\nMango 1.0 A+\nKiwi 3.0 A+\nPear 3.0 A+\nOrange 1.0 A+\nGrape 3.0 A+\nMelon 1.0 A+\nStrawberry 1.0 A+\nCherry 3.0 A+",
          output: "4.500000",
        },
      ],
      hints: [
        "등급별 점수를 Map이나 객체로 매핑하세요",
        "P등급은 총학점과 합산에서 모두 제외합니다",
        "grade가 'P'이면 continue로 건너뛰세요",
        "totalCredit과 totalScore를 누적한 후 totalScore/totalCredit",
        "toFixed(6)으로 소수점 6자리까지 출력",
      ],
      solution: `const lines = input.split('\\n');
const gradeMap = {'A+':4.5,'A0':4.0,'B+':3.5,'B0':3.0,'C+':2.5,'C0':2.0,'D+':1.5,'D0':1.0,'F':0.0};
let totalCredit = 0, totalScore = 0;
for (let i = 0; i < 20; i++) {
  const parts = lines[i].split(' ');
  const credit = parseFloat(parts[1]);
  const grade = parts[2];
  if (grade === 'P') continue;
  totalCredit += credit;
  totalScore += credit * gradeMap[grade];
}
console.log((totalScore / totalCredit).toFixed(6));`,
      starter: `const lines = input.split('\\n');\n\n`,
    },
    {
      id: 18110,
      title: "solved.ac",
      description: `n개의 난이도 의견이 주어진다. 상하위 15%를 제외한 나머지의 평균을 반올림하여 출력하시오.
절사 비율은 반올림. n이 0이면 0을 출력.

【입력】
첫째 줄: n
다음 n줄: 난이도 의견 (1~30)

【출력】
절사평균 (반올림)`,
      testCases: [
        { input: "5\n1\n5\n5\n7\n8", output: "6" },
        { input: "10\n1\n13\n12\n15\n3\n16\n13\n12\n14\n15", output: "13" },
        { input: "0", output: "0" },
      ],
      hints: [
        "정렬 후 앞뒤 Math.round(n*0.15)개를 제외하세요",
        "남은 수의 평균을 Math.round로 반올림하세요",
        "n이 0이면 바로 0 출력하고 종료",
        "제외할 개수: cut = Math.round(n * 0.15)",
        "slice(cut, n-cut)로 남은 배열의 합을 남은 개수로 나누고 Math.round",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
if (n === 0) { console.log(0); }
else {
  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(Number(lines[i]));
  arr.sort((a, b) => a - b);
  const cut = Math.round(n * 0.15);
  const remain = arr.slice(cut, n - cut);
  const avg = remain.reduce((s, v) => s + v, 0) / remain.length;
  console.log(Math.round(avg));
}`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 10866,
      title: "덱",
      description: `정수를 저장하는 덱을 구현하시오.

push_front X: 앞에 추가
push_back X: 뒤에 추가
pop_front: 앞에서 빼고 출력 (비어있으면 -1)
pop_back: 뒤에서 빼고 출력 (비어있으면 -1)
size: 크기 출력
empty: 비어있으면 1, 아니면 0
front: 앞 원소 출력 (비어있으면 -1)
back: 뒤 원소 출력 (비어있으면 -1)

【입력】
첫째 줄: 명령 수 N
다음 N줄: 명령

【출력】
각 출력 명령의 결과`,
      testCases: [
        {
          input: "15\npush_back 1\npush_front 2\nfront\nback\nsize\nempty\npop_front\npop_back\npop_front\nsize\nempty\npop_back\npush_front 3\nempty\nfront",
          output: "2\n1\n2\n0\n2\n1\n-1\n0\n1\n-1\n0\n3",
        },
      ],
      hints: [
        "배열을 사용하고 unshift/push/shift/pop을 활용하세요",
        "각 명령에 따라 분기 처리하세요",
        "if/else if 또는 switch문으로 8가지 명령을 처리하세요",
        "출력이 있는 명령만 console.log 하세요 (push는 출력 없음)",
        "deq.length===0이면 -1 출력, 아니면 shift/pop 결과 출력",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const deq = [];
const result = [];
for (let i = 1; i <= N; i++) {
  const cmd = lines[i];
  if (cmd.startsWith('push_front')) { deq.unshift(Number(cmd.split(' ')[1])); }
  else if (cmd.startsWith('push_back')) { deq.push(Number(cmd.split(' ')[1])); }
  else if (cmd === 'pop_front') { result.push(deq.length ? deq.shift() : -1); }
  else if (cmd === 'pop_back') { result.push(deq.length ? deq.pop() : -1); }
  else if (cmd === 'size') { result.push(deq.length); }
  else if (cmd === 'empty') { result.push(deq.length ? 0 : 1); }
  else if (cmd === 'front') { result.push(deq.length ? deq[0] : -1); }
  else if (cmd === 'back') { result.push(deq.length ? deq[deq.length-1] : -1); }
}
console.log(result.join('\\n'));`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 11723,
      title: "집합",
      description: `비어있는 공집합 S에 다음 연산을 수행하시오.
add x: S에 x 추가
remove x: S에서 x 제거
check x: S에 x 있으면 1, 없으면 0
toggle x: S에 x 있으면 제거, 없으면 추가
all: S = {1,2,...,20}
empty: S = {}

【입력】
첫째 줄: 연산 수 M
다음 M줄: 연산

【출력】
check 연산 결과만 출력`,
      testCases: [
        {
          input: "26\nadd 1\nadd 2\ncheck 1\ncheck 2\ncheck 3\nremove 2\ncheck 1\ncheck 2\ntoggle 3\ncheck 1\ncheck 2\ncheck 3\ncheck 4\nall\ncheck 10\ncheck 15\nempty\ncheck 1\ntoggle 1\ncheck 1\ntoggle 1\ncheck 1\nadd 5\ncheck 5\nremove 5\ncheck 5",
          output: "1\n1\n0\n1\n0\n1\n0\n1\n0\n1\n1\n0\n1\n1\n1\n0",
        },
      ],
      hints: [
        "Set을 사용하면 간편합니다",
        "all은 1~20을 모두 넣고, empty는 clear하세요",
        "check일 때만 결과를 출력(console.log)하면 됩니다",
        "toggle: s.has(x) ? s.delete(x) : s.add(x)",
        "result 배열에 check 결과를 모아서 마지막에 join('\\n')으로 출력하면 빠릅니다",
      ],
      solution: `const lines = input.split('\\n');
const M = Number(lines[0]);
const s = new Set();
const result = [];
for (let i = 1; i <= M; i++) {
  const parts = lines[i].split(' ');
  const cmd = parts[0];
  const x = Number(parts[1]);
  if (cmd === 'add') s.add(x);
  else if (cmd === 'remove') s.delete(x);
  else if (cmd === 'check') result.push(s.has(x) ? 1 : 0);
  else if (cmd === 'toggle') s.has(x) ? s.delete(x) : s.add(x);
  else if (cmd === 'all') { s.clear(); for(let j=1;j<=20;j++) s.add(j); }
  else if (cmd === 'empty') s.clear();
}
console.log(result.join('\\n'));`,
      starter: `const lines = input.split('\\n');\nconst M = Number(lines[0]);\n\n`,
    },
    {
      id: 2960,
      title: "에라토스테네스의 체",
      description: `에라토스테네스의 체로 2부터 N까지의 소수를 구하는 과정에서 K번째로 지워지는 수를 구하시오.

2부터 시작해서 아직 지워지지 않은 가장 작은 수를 찾고, 그 배수를 지운다 (자기자신 포함).

【입력】
N K (2 ≤ N ≤ 1000, 1 ≤ K)

【출력】
K번째로 지워지는 수`,
      testCases: [
        { input: "10 7", output: "9" },
        { input: "7 2", output: "3" },
      ],
      hints: [
        "소수의 배수를 지울 때, 자기 자신도 '지워지는 것'에 포함합니다",
        "지울 때마다 카운트하고, K번째에 출력하세요",
        "erased 배열로 지워진 여부를 관리하세요",
        "2부터 순회하며 지워지지 않은 수 p를 찾고, p, 2p, 3p... 순으로 지워가며 카운트",
        "count가 K가 되는 순간의 수를 출력하고 종료",
      ],
      solution: `const [N, K] = input.split(' ').map(Number);
const erased = new Array(N + 1).fill(false);
let count = 0;
for (let i = 2; i <= N; i++) {
  if (erased[i]) continue;
  for (let j = i; j <= N; j += i) {
    if (!erased[j]) {
      erased[j] = true;
      count++;
      if (count === K) { console.log(j); break; }
    }
  }
  if (count >= K) break;
}`,
      starter: `const [N, K] = input.split(' ').map(Number);\n\n`,
    },
    {
      id: 2740,
      title: "행렬 곱셈",
      description: `N×M 행렬 A와 M×K 행렬 B가 주어졌을 때 A×B를 구하시오.

【입력】
첫째 줄: N M
다음 N줄: A 행렬
다음 줄: M K
다음 M줄: B 행렬

【출력】
A×B 행렬 (공백 구분)`,
      testCases: [
        {
          input: "2 3\n1 2 3\n4 5 6\n3 2\n-1 -2\n0 0\n0 0",
          output: "-1 -2\n-4 -8",
        },
      ],
      hints: [
        "C[i][j] = sum(A[i][k] * B[k][j]) for k in 0..M-1",
        "3중 for문으로 구현하세요",
        "결과 행렬 크기는 N×K 입니다",
        "행렬 A와 B를 2차원 배열로 파싱한 후 곱셈 수행",
        "result[i][j] += A[i][k] * B[k][j] 를 모든 k에 대해 합산",
      ],
      solution: `const lines = input.split('\\n');
let idx = 0;
const [N, M1] = lines[idx++].split(' ').map(Number);
const A = [];
for (let i = 0; i < N; i++) A.push(lines[idx++].split(' ').map(Number));
const [M2, K] = lines[idx++].split(' ').map(Number);
const B = [];
for (let i = 0; i < M2; i++) B.push(lines[idx++].split(' ').map(Number));
const C = Array.from({length: N}, () => new Array(K).fill(0));
for (let i = 0; i < N; i++)
  for (let j = 0; j < K; j++)
    for (let k = 0; k < M1; k++)
      C[i][j] += A[i][k] * B[k][j];
console.log(C.map(r => r.join(' ')).join('\\n'));`,
      starter: `const lines = input.split('\\n');\n\n`,
    },
    {
      id: 10973,
      title: "이전 순열",
      description: `1~N의 순열이 주어졌을 때, 사전순으로 이전 순열을 구하시오.
이전 순열이 없으면 -1 출력.

【입력】
첫째 줄: N (1 ≤ N ≤ 10,000)
둘째 줄: 순열

【출력】
이전 순열 또는 -1`,
      testCases: [
        { input: "4\n1 2 3 4", output: "-1" },
        { input: "4\n2 3 4 1", output: "2 3 1 4" },
      ],
      hints: [
        "뒤에서부터 a[i-1] > a[i]인 지점을 찾으세요",
        "a[i-1]보다 작은 수 중 가장 큰 수와 교환 후, i부터 끝까지 내림차순 정렬",
        "다음 순열의 반대 개념입니다 - 감소하는 지점을 찾아요",
        "i를 못 찾으면 (이미 최소 순열이면) -1 출력",
        "교환 후 i~끝을 reverse 하면 내림차순이 됩니다",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const a = lines[1].split(' ').map(Number);
let i = n - 1;
while (i > 0 && a[i - 1] <= a[i]) i--;
if (i === 0) { console.log(-1); }
else {
  let j = n - 1;
  while (a[j] >= a[i - 1]) j--;
  [a[i-1], a[j]] = [a[j], a[i-1]];
  const left = a.slice(0, i);
  const right = a.slice(i).reverse();
  console.log(left.concat(right).join(' '));
}`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 20546,
      title: "기적의 매매법",
      description: `준현이(성현이) 두 사람의 주식 매매법을 시뮬레이션하시오.
- 준현(BNP): 살 수 있으면 무조건 최대한 산다
- 성현(TIMING): 3일 연속 하락이면 전량 매수, 3일 연속 상승이면 전량 매도

【입력】
첫째 줄: 초기 현금
둘째 줄: 14일간 주가

【출력】
BNP의 최종 자산
TIMING의 최종 자산`,
      testCases: [
        {
          input: "100\n10 20 30 40 50 60 70 80 90 100 110 120 130 140",
          output: "BNP 1400\nTIMING 100",
        },
      ],
      hints: [
        "BNP: 매일 현금//주가 만큼 매수",
        "TIMING: 연속 상승/하락 일수를 세서 3일 되면 매도/매수",
        "최종 자산 = 현금 + 주식수 × 마지막날 주가",
        "TIMING의 연속 카운트: 상승이면 up++, down=0 / 하락이면 down++, up=0",
        "3일 연속 하락 시 전량매수(현금/주가만큼), 3일 연속 상승 시 전량매도(현금+=주식*주가)",
      ],
      solution: `const lines = input.split('\\n');
const cash = Number(lines[0]);
const prices = lines[1].split(' ').map(Number);
let bnpCash = cash, bnpStock = 0;
let timCash = cash, timStock = 0;
let up = 0, down = 0;
for (let i = 0; i < 14; i++) {
  const p = prices[i];
  const buy = Math.floor(bnpCash / p);
  bnpCash -= buy * p;
  bnpStock += buy;
  if (i > 0) {
    if (prices[i] > prices[i-1]) { up++; down = 0; }
    else if (prices[i] < prices[i-1]) { down++; up = 0; }
    else { up = 0; down = 0; }
  }
  if (down >= 3) { const b = Math.floor(timCash / p); timCash -= b * p; timStock += b; }
  if (up >= 3) { timCash += timStock * p; timStock = 0; }
}
console.log('BNP ' + (bnpCash + bnpStock * prices[13]));
console.log('TIMING ' + (timCash + timStock * prices[13]));`,
      starter: `const lines = input.split('\\n');\nconst cash = Number(lines[0]);\n\n`,
    },
    {
      id: 20125,
      title: "쿠키의 신체 측정",
      description: `쿠키의 신체를 측정한다. N×N 격자에서 쿠키 모양(1)이 주어진다.
머리를 찾고 (가장 위의 1), 머리 바로 아래가 몸통의 시작.
몸통에서 양쪽으로 뻗은 것이 팔, 아래로 뻗은 것이 다리.
왼팔, 오른팔, 허리, 왼다리, 오른다리 길이를 출력하시오.

【입력】
첫째 줄: N
다음 N줄: 격자 (0과 1)

【출력】
첫째 줄: 심장 좌표 (행 열, 1-indexed)
둘째 줄: 왼팔 오른팔 허리 왼다리 오른다리 길이`,
      testCases: [
        {
          input: "5\n00100\n01110\n00100\n00100\n01010",
          output: "2 3\n1 1 2 1 1",
        },
      ],
      hints: [
        "머리를 찾고 한 칸 아래가 심장입니다",
        "심장에서 좌우로 1의 길이가 팔, 아래로 몸통, 몸통 끝에서 좌우가 다리",
        "머리: 가장 위에 1이 있는 칸, 심장: (머리행+1, 머리열)",
        "왼팔: 심장에서 왼쪽으로 1인 칸 수, 오른팔: 오른쪽으로",
        "허리: 심장 아래로 1인 칸 수, 허리 끝에서 왼쪽/오른쪽 아래로 다리",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const grid = [];
for (let i = 1; i <= N; i++) grid.push(lines[i]);
let hr, hc;
outer: for (let i = 0; i < N; i++)
  for (let j = 0; j < grid[i].length; j++)
    if (grid[i][j] === '1') { hr = i + 1; hc = j; break outer; }
const sr = hr, sc = hc;
let leftArm = 0, rightArm = 0, waist = 0, leftLeg = 0, rightLeg = 0;
for (let j = sc - 1; j >= 0 && grid[sr][j] === '1'; j--) leftArm++;
for (let j = sc + 1; j < grid[sr].length && grid[sr][j] === '1'; j++) rightArm++;
let wr = sr + 1;
while (wr < N && grid[wr][sc] === '1') { waist++; wr++; }
for (let i = wr; i < N && grid[i][sc-1] === '1'; i++) leftLeg++;
for (let i = wr; i < N && grid[i][sc+1] === '1'; i++) rightLeg++;
console.log((sr + 1) + ' ' + (sc + 1));
console.log(leftArm + ' ' + rightArm + ' ' + waist + ' ' + leftLeg + ' ' + rightLeg);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 17829,
      title: "222-풀링",
      description: `N×N 행렬(N은 2의 거듭제곱)에서 2×2씩 묶어 두 번째로 큰 값을 취하는 풀링을 반복한다.
1×1이 될 때까지 반복한 결과를 출력하시오.

【입력】
첫째 줄: N (2 ≤ N ≤ 1024, 2의 거듭제곱)
다음 N줄: 행렬

【출력】
최종 값`,
      testCases: [
        { input: "2\n1 2\n3 4", output: "3" },
        { input: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output: "11" },
      ],
      hints: [
        "2×2를 정렬해서 두 번째로 큰 값(인덱스 2)을 취하세요",
        "크기가 1이 될 때까지 반복",
        "4개를 정렬하면 [a,b,c,d] 중 인덱스 2가 두 번째로 큰 값",
        "새 행렬을 만들어 절반 크기로 줄여나가세요",
        "while(size>1) { 새 size/2 행렬 생성, 2×2마다 두번째 큰 값으로 채움 }",
      ],
      solution: `const lines = input.split('\\n');
let N = Number(lines[0]);
let mat = [];
for (let i = 1; i <= N; i++) mat.push(lines[i].split(' ').map(Number));
while (N > 1) {
  const half = N / 2;
  const next = Array.from({length: half}, () => new Array(half));
  for (let i = 0; i < half; i++) {
    for (let j = 0; j < half; j++) {
      const vals = [mat[i*2][j*2], mat[i*2][j*2+1], mat[i*2+1][j*2], mat[i*2+1][j*2+1]];
      vals.sort((a,b) => a - b);
      next[i][j] = vals[2];
    }
  }
  mat = next;
  N = half;
}
console.log(mat[0][0]);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1531,
      title: "투명",
      description: `100×100 격자 위에 N개의 불투명한 종이를 겹쳐 놓는다.
각 종이는 좌하단(x1,y1)과 우상단(x2,y2)로 주어진다.
종이가 정확히 하나만 덮인 칸 수를 구하시오.

【입력】
첫째 줄: N (1 ≤ N ≤ 50)
다음 N줄: x1 y1 x2 y2

【출력】
정확히 하나만 덮인 칸의 수`,
      testCases: [
        { input: "2\n1 1 3 3\n2 2 4 4", output: "6" },
        { input: "1\n1 1 5 5", output: "16" },
      ],
      hints: [
        "100×100 배열을 만들고 각 종이 영역마다 +1 하세요",
        "값이 정확히 1인 칸을 세면 됩니다",
        "x1~x2-1, y1~y2-1 범위를 +1 하세요 (좌표계 주의)",
        "2중 for문으로 각 종이의 영역을 grid에 +1",
        "마지막에 grid 전체 순회하며 값이 1인 칸 카운트",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const grid = Array.from({length: 101}, () => new Array(101).fill(0));
for (let i = 1; i <= N; i++) {
  const [x1, y1, x2, y2] = lines[i].split(' ').map(Number);
  for (let x = x1; x < x2; x++)
    for (let y = y1; y < y2; y++)
      grid[x][y]++;
}
let count = 0;
for (let x = 0; x < 101; x++)
  for (let y = 0; y < 101; y++)
    if (grid[x][y] === 1) count++;
console.log(count);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 4659,
      title: "비밀번호 발음하기",
      description: `비밀번호가 발음 가능한지 판별하시오.
규칙:
1. 모음(a,e,i,o,u)이 하나 이상 포함
2. 모음 3개 연속 불가
3. 자음 3개 연속 불가
4. 같은 글자 연속 2번 불가 (단 ee, oo는 허용)

【입력】
한 줄에 하나씩 비밀번호. "end"가 입력되면 종료.

【출력】
각 비밀번호에 대해 acceptable/not acceptable 출력`,
      testCases: [
        {
          input: "a\ntv\nptoui\nbontres\nzoggax\nnoober\nend",
          output: "<a> is acceptable.\n<tv> is not acceptable.\n<ptoui> is not acceptable.\n<bontres> is not acceptable.\n<zoggax> is not acceptable.\n<noober> is acceptable.",
        },
      ],
      hints: [
        "모음 여부를 판별하는 함수를 먼저 만드세요",
        "4가지 규칙을 모두 체크하고, 하나라도 위반하면 not acceptable",
        "'aeiou'.includes(ch)로 모음 판별 가능",
        "연속 모음/자음 카운트와 이전 문자 추적이 필요해요",
        "for문으로 순회하며: 모음존재체크, 연속모음3체크, 연속자음3체크, 같은글자2연속(ee,oo제외) 체크",
      ],
      solution: `const lines = input.split('\\n');
const vowels = 'aeiou';
for (const pw of lines) {
  if (pw === 'end') break;
  let ok = true;
  let hasVowel = false, vc = 0, cc = 0, prev = '';
  for (const ch of pw) {
    const isV = vowels.includes(ch);
    if (isV) { hasVowel = true; vc++; cc = 0; }
    else { cc++; vc = 0; }
    if (vc >= 3 || cc >= 3) { ok = false; break; }
    if (ch === prev && ch !== 'e' && ch !== 'o') { ok = false; break; }
    prev = ch;
  }
  if (!hasVowel) ok = false;
  console.log('<' + pw + '> is ' + (ok ? 'acceptable' : 'not acceptable') + '.');
}`,
      starter: `const lines = input.split('\\n');\n\n`,
    },
    {
      id: 11866,
      title: "요세푸스 문제 0",
      description: `1번부터 N번까지 N명이 원을 이루어 앉아있다.
K번째 사람을 순서대로 제거한다. 제거 순서를 출력하시오.

【입력】
N K (1 ≤ K ≤ N ≤ 1,000)

【출력】
<a1, a2, ..., aN> 형식`,
      testCases: [
        { input: "7 3", output: "<3, 6, 2, 7, 5, 1, 4>" },
      ],
      hints: [
        "배열에서 인덱스를 K-1씩 이동하며 제거하세요",
        "인덱스가 배열 길이를 넘으면 나머지 연산(%)을 사용하세요",
        "현재 인덱스 = (현재인덱스 + K - 1) % 남은인원수",
        "splice(idx, 1)로 해당 위치 제거 후 result에 추가",
        "결과를 '<' + result.join(', ') + '>' 형식으로 출력",
      ],
      solution: `const [N, K] = input.split(' ').map(Number);
const arr = [];
for (let i = 1; i <= N; i++) arr.push(i);
const result = [];
let idx = 0;
while (arr.length > 0) {
  idx = (idx + K - 1) % arr.length;
  result.push(arr.splice(idx, 1)[0]);
}
console.log('<' + result.join(', ') + '>');`,
      starter: `const [N, K] = input.split(' ').map(Number);\n\n`,
    },
    {
      id: 2303,
      title: "숫자 게임",
      description: `각 팀원이 카드 5장을 가진다. 3장을 골라 합이 가장 큰데 100 이하인 팀이 이긴다.

【입력】
첫째 줄: 팀원 수 N
다음 N줄: 5개의 카드

【출력】
100 이하이면서 가장 큰 합`,
      testCases: [
        { input: "2\n7 87 3 2 5\n20 30 40 50 60", output: "100" },
      ],
      hints: [
        "5장에서 3장을 고르는 모든 조합을 탐색하세요",
        "5C3 = 10가지밖에 안 됩니다. 3중 for문으로 충분해요",
        "모든 팀원에 대해 각각 최대 합을 구하고, 그 중 최대",
        "3중 for문: for i, for j>i, for k>j => cards[i]+cards[j]+cards[k]",
        "합이 100 이하이면서 최대인 값을 추적, 전체 팀원 중 최대 출력",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
let best = 0;
for (let t = 1; t <= N; t++) {
  const cards = lines[t].split(' ').map(Number);
  for (let i = 0; i < 5; i++)
    for (let j = i + 1; j < 5; j++)
      for (let k = j + 1; k < 5; k++) {
        const s = cards[i] + cards[j] + cards[k];
        if (s <= 100 && s > best) best = s;
      }
}
console.log(best);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 17478,
      title: "재귀함수가 뭔가요?",
      description: `재귀적으로 "재귀함수가 뭔가요?"를 출력하는 프로그램을 작성하시오.
N번째 깊이까지 들어갔다가 돌아온다. 들여쓰기는 "____"(언더바4개)로.

【입력】
N (1 ≤ N ≤ 50)

【출력】
예제 출력 참고`,
      testCases: [
        {
          input: "2",
          output: `"재귀함수가 뭔가요?"
"잘 들어보게. 옛날옛날 , , , 한 , , , 마을에 , , , , , , 마을에 , , , 한 , , , 프로그래머가 살았다네."
"재귀함수가 뭔가요?"
"잘 들어보게. 옛날옛날 , , , 한 , , , 마을에 , , , , , , 마을에 , , , 한 , , , 프로그래머가 살았다네."
____"재귀함수가 뭔가요?"
____"잘 들어보게. 옛날옛날 , , , 한 , , , 마을에 , , , , , , 마을에 , , , 한 , , , 프로그래머가 살았다네."
____"재귀함수가 뭔가요?"
____"잘 들어보게. 옛날옛날 , , , 한 , , , 마을에 , , , , , , 마을에 , , , 한 , , , 프로그래머가 살았다네."
________"재귀함수가 뭔가요?"
________"라고 답변하였지."
____"라고 답변하였지."
"라고 답변하였지."`,
        },
      ],
      hints: [
        "재귀함수를 실제로 만들어서 깊이별로 출력하세요",
        "들여쓰기는 '____'.repeat(depth)로 만들 수 있어요",
        "깊이가 N이면 '라고 답변하였지.'만 출력하고 리턴",
        "깊이가 N 미만이면 질문→이야기→재귀호출→답변 순으로 출력",
        "function rec(d) { print(indent+'질문'); if(d===N) {print(indent+'답변');} else {print(indent+'이야기'); rec(d+1); print(indent+'답변');} }",
      ],
      solution: `const n = Number(input);
const result = [];
function rec(depth) {
  const indent = '____'.repeat(depth);
  result.push(indent + '"재귀함수가 뭔가요?"');
  if (depth === n) {
    result.push(indent + '"라고 답변하였지."');
  } else {
    result.push(indent + '"잘 들어보게. 옛날옛날 , , , 한 , , , 마을에 , , , , , , 마을에 , , , 한 , , , 프로그래머가 살았다네."');
    rec(depth + 1);
    result.push(indent + '"라고 답변하였지."');
  }
}
result.push('"재귀함수가 뭔가요?"');
result.push('"잘 들어보게. 옛날옛날 , , , 한 , , , 마을에 , , , , , , 마을에 , , , 한 , , , 프로그래머가 살았다네."');
rec(1);
console.log(result.join('\\n'));`,
      starter: `const n = Number(input);\n\n`,
    },
    {
      id: 1018,
      title: "체스판 다시 칠하기",
      description: `M×N 보드를 8×8로 잘라 체스판을 만들려 한다.
체스판은 "BWBWBW..." 또는 "WBWBWB..."로 시작해야 한다.
다시 칠해야 하는 칸의 최솟값을 구하시오.

【입력】
첫째 줄: N M (8 ≤ N, M ≤ 50)
다음 N줄: 보드

【출력】
최소로 다시 칠해야 하는 칸 수`,
      testCases: [
        {
          input: "8 8\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW",
          output: "0",
        },
        {
          input: "10 13\nBBBBBBBBWBWBW\nBBBBBBBBWBWBW\nBBBBBBBBWBWBW\nBBBBBBBBWBWBW\nBBBBBBBBWBWBW\nBBBBBBBBWBWBW\nBBBBBBBBWBWBW\nBBBBBBBBWBWBW\nWWWWWWWWWWWWW\nWWWWWWWWWWWWW",
          output: "12",
        },
      ],
      hints: [
        "모든 가능한 8×8 시작점을 탐색하세요 (완전탐색)",
        "각 시작점에서 B시작/W시작 두 경우 모두 세보세요",
        "(i+j)%2로 체스판 패턴을 만들 수 있어요",
        "시작점(r,c)에서 8×8 영역 내 불일치 수를 두 패턴 모두 계산",
        "B시작 불일치 = count, W시작 불일치 = 64-count. 전체 시작점 중 최솟값 출력",
      ],
      solution: `const lines = input.split('\\n');
const [N, M] = lines[0].split(' ').map(Number);
const board = [];
for (let i = 1; i <= N; i++) board.push(lines[i]);
let minCost = 64;
for (let r = 0; r <= N - 8; r++) {
  for (let c = 0; c <= M - 8; c++) {
    let cnt = 0;
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        const expected = (i + j) % 2 === 0 ? 'B' : 'W';
        if (board[r+i][c+j] !== expected) cnt++;
      }
    minCost = Math.min(minCost, cnt, 64 - cnt);
  }
}
console.log(minCost);`,
      starter: `const lines = input.split('\\n');\nconst [N, M] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 7568,
      title: "덩치",
      description: `사람들의 (몸무게, 키)가 주어진다.
덩치 등수: 자신보다 몸무게와 키 모두 큰 사람의 수 + 1

【입력】
첫째 줄: N (2 ≤ N ≤ 50)
다음 N줄: 몸무게 키

【출력】
각 사람의 덩치 등수 (공백 구분)`,
      testCases: [
        { input: "5\n55 185\n58 183\n88 186\n60 175\n46 155", output: "2 2 1 2 5" },
      ],
      hints: [
        "각 사람마다 나보다 몸무게 AND 키 모두 큰 사람 수를 세세요",
        "O(N²) 이중 for문으로 충분합니다",
        "등수 = 나보다 큰 사람 수 + 1",
        "people[j].w > people[i].w && people[j].h > people[i].h 이면 카운트++",
        "각 사람의 등수를 배열에 저장 후 join(' ')으로 출력",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const people = [];
for (let i = 1; i <= n; i++) {
  const [w, h] = lines[i].split(' ').map(Number);
  people.push({ w, h });
}
const ranks = [];
for (let i = 0; i < n; i++) {
  let rank = 1;
  for (let j = 0; j < n; j++) {
    if (people[j].w > people[i].w && people[j].h > people[i].h) rank++;
  }
  ranks.push(rank);
}
console.log(ranks.join(' '));`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 2563,
      title: "색종이",
      description: `가로세로 100인 흰 도화지 위에 10×10 검은 색종이를 여러 장 붙인다.
검은 영역의 넓이를 구하시오.

【입력】
첫째 줄: 색종이 수 N (1 ≤ N ≤ 100)
다음 N줄: 왼쪽 아래 좌표 (x, y)

【출력】
검은 영역 넓이`,
      testCases: [
        { input: "3\n3 7\n15 7\n5 2", output: "260" },
      ],
      hints: [
        "100×100 배열을 만들고, 각 색종이 영역을 1로 채우세요",
        "1의 개수를 세면 넓이입니다",
        "x~x+9, y~y+9 범위를 1로 마킹",
        "겹치는 부분은 이미 1이므로 자동으로 중복 제거됩니다",
        "grid 전체 순회하며 1인 칸 수를 세서 출력",
      ],
      solution: `const lines = input.split('\\n');
const n = Number(lines[0]);
const grid = Array.from({length: 100}, () => new Array(100).fill(0));
for (let i = 1; i <= n; i++) {
  const [x, y] = lines[i].split(' ').map(Number);
  for (let dx = 0; dx < 10; dx++)
    for (let dy = 0; dy < 10; dy++)
      grid[x + dx][y + dy] = 1;
}
let count = 0;
for (let i = 0; i < 100; i++)
  for (let j = 0; j < 100; j++)
    count += grid[i][j];
console.log(count);`,
      starter: `const lines = input.split('\\n');\nconst n = Number(lines[0]);\n\n`,
    },
    {
      id: 1158,
      title: "요세푸스 문제",
      description: `1번부터 N번까지 N명이 원을 이루어 앉아있다.
K번째 사람을 순서대로 제거한다. 모두 제거될 때까지의 순서를 출력하시오.

【입력】
N K (1 ≤ K ≤ N ≤ 5,000)

【출력】
<a1, a2, ..., aN> 형식`,
      testCases: [
        { input: "7 3", output: "<3, 6, 2, 7, 5, 1, 4>" },
      ],
      hints: [
        "배열을 원형으로 생각하고 인덱스를 % 연산으로 관리하세요",
        "splice로 해당 위치의 원소를 제거하세요",
        "요세푸스 문제 0과 동일한 풀이입니다",
        "idx = (idx + K - 1) % arr.length 로 K번째를 찾고 제거",
        "결과를 '<' + result.join(', ') + '>'로 출력",
      ],
      solution: `const [N, K] = input.split(' ').map(Number);
const arr = [];
for (let i = 1; i <= N; i++) arr.push(i);
const result = [];
let idx = 0;
while (arr.length > 0) {
  idx = (idx + K - 1) % arr.length;
  result.push(arr.splice(idx, 1)[0]);
}
console.log('<' + result.join(', ') + '>');`,
      starter: `const [N, K] = input.split(' ').map(Number);\n\n`,
    },
    {
      id: 1966,
      title: "프린터 큐",
      description: `중요도에 따라 인쇄하는 프린터. 큐의 맨 앞 문서가 나머지 중 중요도가 가장 높지 않으면 뒤로 보낸다.
M번째 문서가 몇 번째로 인쇄되는지 구하시오.

【입력】
테스트케이스 수 T
각 케이스: N M / 중요도들

【출력】
M번째 문서의 인쇄 순서`,
      testCases: [
        { input: "3\n1 0\n5\n4 2\n1 2 3 4\n6 0\n1 1 9 1 1 1", output: "1\n2\n5" },
      ],
      hints: [
        "큐에 {중요도, 원래인덱스}를 넣으세요",
        "최대 중요도가 아니면 뒤로 보내고, 맞으면 인쇄 카운트+1",
        "인쇄된 문서의 원래인덱스가 M이면 그때의 카운트가 답",
        "while문으로 큐 앞을 확인: Math.max보다 작으면 push, 아니면 인쇄",
        "queue.shift() 후 queue.some(q => q.pri > cur.pri) 이면 다시 push",
      ],
      solution: `const lines = input.split('\\n');
const T = Number(lines[0]);
const result = [];
let idx = 1;
for (let t = 0; t < T; t++) {
  const [N, M] = lines[idx++].split(' ').map(Number);
  const pris = lines[idx++].split(' ').map(Number);
  const queue = pris.map((p, i) => ({ pri: p, idx: i }));
  let count = 0;
  while (queue.length > 0) {
    const cur = queue.shift();
    if (queue.some(q => q.pri > cur.pri)) {
      queue.push(cur);
    } else {
      count++;
      if (cur.idx === M) { result.push(count); break; }
    }
  }
}
console.log(result.join('\\n'));`,
      starter: `const lines = input.split('\\n');\nconst T = Number(lines[0]);\n\n`,
    },
    {
      id: 2108,
      title: "통계학",
      description: `N개의 수가 주어졌을 때 다음 4가지를 구하시오.
1. 산술평균 (소수점 이하 반올림)
2. 중앙값
3. 최빈값 (여러 개면 두 번째로 작은 값)
4. 범위 (최대-최소)

【입력】
첫째 줄: N (홀수)
다음 N줄: 정수

【출력】
4줄에 걸쳐 출력`,
      testCases: [
        { input: "5\n1\n3\n8\n-2\n2", output: "2\n2\n1\n10" },
        { input: "1\n4000", output: "4000\n4000\n4000\n0" },
      ],
      hints: [
        "정렬 후 중앙값은 arr[Math.floor(N/2)]",
        "최빈값: 빈도를 세고, 최빈값이 여러 개면 정렬 후 두 번째",
        "산술평균: Math.round(합/N)",
        "빈도 세기: Map으로 각 수의 등장 횟수를 관리",
        "최빈값이 여러 개일 때: 빈도 같은 값들을 정렬해서 두 번째(인덱스 1) 선택",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const arr = [];
for (let i = 1; i <= N; i++) arr.push(Number(lines[i]));
arr.sort((a, b) => a - b);
const avg = Math.round(arr.reduce((s, v) => s + v, 0) / N);
const mid = arr[Math.floor(N / 2)];
const freq = new Map();
for (const v of arr) freq.set(v, (freq.get(v) || 0) + 1);
const maxFreq = Math.max(...freq.values());
const modes = [...freq.entries()].filter(([k, v]) => v === maxFreq).map(([k]) => k).sort((a, b) => a - b);
const mode = modes.length >= 2 ? modes[1] : modes[0];
const range = arr[N - 1] - arr[0];
console.log(avg);
console.log(mid);
console.log(mode);
console.log(range);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 17413,
      title: "단어 뒤집기 2",
      description: `문자열 S가 주어졌을 때 단어를 뒤집는다.
단, <tag> 안의 단어는 뒤집지 않는다. 공백도 유지.

【입력】
문자열 S (길이 ≤ 100,000)

【출력】
뒤집은 결과`,
      testCases: [
        { input: "baekjoon online judge", output: "noojkeab enilno egduj" },
        { input: "<open>tag<close>", output: "<open>gat<close>" },
        { input: "<ab cd>ef gh<ij kl>", output: "<ab cd>fe hg<ij kl>" },
      ],
      hints: [
        "태그 안인지 밖인지 상태를 추적하세요",
        "태그 밖에서 공백이나 '<'를 만나면 지금까지 모은 단어를 뒤집어서 추가",
        "inTag 플래그를 사용: '<' 만나면 true, '>' 만나면 false",
        "태그 밖에서 단어를 모으다가 공백/<를 만나면 뒤집어서 result에 추가",
        "단어 버퍼(word)를 관리: 태그밖에서 일반문자면 word+=ch, 그 외 경우 word를 reverse하고 flush",
      ],
      solution: `const s = input;
let result = '';
let word = '';
let inTag = false;
for (const ch of s) {
  if (ch === '<') {
    result += word.split('').reverse().join('');
    word = '';
    inTag = true;
    result += ch;
  } else if (ch === '>') {
    inTag = false;
    result += ch;
  } else if (inTag) {
    result += ch;
  } else if (ch === ' ') {
    result += word.split('').reverse().join('') + ' ';
    word = '';
  } else {
    word += ch;
  }
}
result += word.split('').reverse().join('');
console.log(result);`,
      starter: `const s = input;\n\n`,
    },
    {
      id: 2167,
      title: "2차원 배열의 합",
      description: `N×M 배열에서 (i,j)부터 (x,y)까지의 합을 구하시오.

【입력】
첫째 줄: N M
다음 N줄: 배열
다음 줄: K (질의 수)
다음 K줄: i j x y

【출력】
각 질의의 답`,
      testCases: [
        {
          input: "2 3\n1 2 4\n8 16 32\n3\n1 1 2 3\n1 2 1 2\n1 3 2 3",
          output: "63\n2\n36",
        },
      ],
      hints: [
        "누적합(prefix sum)을 사용하면 빠릅니다",
        "단순히 2중 for문으로 구간합을 구해도 됩니다",
        "각 질의마다 (i,j)~(x,y) 범위를 2중 for문으로 합산",
        "인덱스가 1-based임에 주의하세요",
        "for(r=i-1; r<x; r++) for(c=j-1; c<y; c++) sum += arr[r][c]",
      ],
      solution: `const lines = input.split('\\n');
const [N, M] = lines[0].split(' ').map(Number);
const arr = [];
for (let i = 1; i <= N; i++) arr.push(lines[i].split(' ').map(Number));
const K = Number(lines[N + 1]);
const result = [];
for (let q = 0; q < K; q++) {
  const [i, j, x, y] = lines[N + 2 + q].split(' ').map(Number);
  let sum = 0;
  for (let r = i - 1; r < x; r++)
    for (let c = j - 1; c < y; c++)
      sum += arr[r][c];
  result.push(sum);
}
console.log(result.join('\\n'));`,
      starter: `const lines = input.split('\\n');\nconst [N, M] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 1244,
      title: "스위치 켜고 끄기",
      description: `N개의 스위치가 있다. 학생이 남자면 받은 수의 배수 스위치를 toggle,
여자면 받은 수 중심으로 좌우 대칭인 구간을 toggle.

【입력】
첫째 줄: 스위치 수 N
둘째 줄: 스위치 상태
셋째 줄: 학생 수
다음 줄들: 성별(1남/2여) 번호

【출력】
최종 스위치 상태 (한 줄에 20개씩)`,
      testCases: [
        {
          input: "8\n0 1 0 1 0 0 0 1\n2\n1 3\n2 4",
          output: "1 0 0 0 1 1 0 1",
        },
      ],
      hints: [
        "남자: 번호의 배수 위치를 모두 toggle",
        "여자: 번호 위치에서 좌우로 같은 값인 동안 확장 후 toggle",
        "toggle: sw[i] = 1 - sw[i] 또는 sw[i] ^= 1",
        "여자: 중심에서 좌우를 1칸씩 확장, sw[left]===sw[right]일 때까지",
        "출력 시 20개씩 끊어서 출력 (slice(0,20), slice(20,40), ...)",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const sw = lines[1].split(' ').map(Number);
const S = Number(lines[2]);
for (let s = 0; s < S; s++) {
  const [gender, num] = lines[3 + s].split(' ').map(Number);
  if (gender === 1) {
    for (let i = num - 1; i < N; i += num) sw[i] ^= 1;
  } else {
    const c = num - 1;
    sw[c] ^= 1;
    let d = 1;
    while (c - d >= 0 && c + d < N && sw[c - d] === sw[c + d]) {
      sw[c - d] ^= 1;
      sw[c + d] ^= 1;
      d++;
    }
  }
}
const result = [];
for (let i = 0; i < N; i += 20) {
  result.push(sw.slice(i, i + 20).join(' '));
}
console.log(result.join('\\n'));`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1213,
      title: "팰린드롬 만들기",
      description: `주어진 영문 대문자로 팰린드롬을 만드시오.
사전순으로 가장 앞서는 팰린드롬을 출력. 불가능하면 "I'm Sorry Hansoo"

【입력】
문자열 (길이 ≤ 50)

【출력】
팰린드롬 또는 I'm Sorry Hansoo`,
      testCases: [
        { input: "AABB", output: "ABBA" },
        { input: "AAABB", output: "ABABA" },
        { input: "ABC", output: "I'm Sorry Hansoo" },
      ],
      hints: [
        "홀수 개인 문자가 2개 이상이면 불가능",
        "짝수 개인 문자의 절반을 정렬 + 홀수문자 중앙 + 역순",
        "각 문자의 빈도를 세세요",
        "홀수 빈도 문자가 0 또는 1개여야 팰린드롬 가능",
        "절반 문자를 정렬하고 + 중앙문자(있으면) + 절반역순으로 조합",
      ],
      solution: `const s = input;
const freq = {};
for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
let oddCount = 0, oddChar = '';
const half = [];
for (const [ch, cnt] of Object.entries(freq)) {
  if (cnt % 2 === 1) { oddCount++; oddChar = ch; }
  for (let i = 0; i < Math.floor(cnt / 2); i++) half.push(ch);
}
if (oddCount > 1) { console.log("I'm Sorry Hansoo"); }
else {
  half.sort();
  const left = half.join('');
  const right = half.reverse().join('');
  console.log(left + (oddCount ? oddChar : '') + right);
}`,
      starter: `const s = input;\n\n`,
    },
    {
      id: 1051,
      title: "숫자 정사각형",
      description: `N×M 배열에서 네 꼭짓점의 숫자가 모두 같은 가장 큰 정사각형을 찾으시오.

【입력】
첫째 줄: N M
다음 N줄: 숫자열

【출력】
가장 큰 정사각형의 넓이`,
      testCases: [
        { input: "3 5\n42101\n22100\n22101", output: "9" },
        { input: "1 1\n5", output: "1" },
      ],
      hints: [
        "가능한 크기를 큰 것부터 시도하세요",
        "네 꼭짓점: (i,j), (i,j+d), (i+d,j), (i+d,j+d)가 모두 같은지 확인",
        "d를 min(N,M)-1부터 0까지 줄여가며 탐색",
        "처음 발견되면 (d+1)*(d+1)을 출력하고 종료",
        "3중 for문: for d, for i(0~N-d-1), for j(0~M-d-1) => 네 꼭짓점 비교",
      ],
      solution: `const lines = input.split('\\n');
const [N, M] = lines[0].split(' ').map(Number);
const board = [];
for (let i = 1; i <= N; i++) board.push(lines[i]);
for (let d = Math.min(N, M) - 1; d >= 0; d--) {
  for (let i = 0; i + d < N; i++) {
    for (let j = 0; j + d < M; j++) {
      const v = board[i][j];
      if (board[i][j+d] === v && board[i+d][j] === v && board[i+d][j+d] === v) {
        console.log((d + 1) * (d + 1));
        return;
      }
    }
  }
}`,
      starter: `const lines = input.split('\\n');\nconst [N, M] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 8979,
      title: "올림픽",
      description: `각 나라의 금/은/동 메달 수가 주어진다.
금 → 은 → 동 순으로 비교하여 등수를 매긴다. K번 나라의 등수를 구하시오.

【입력】
첫째 줄: N K
다음 N줄: 나라번호 금 은 동

【출력】
K번 나라의 등수`,
      testCases: [
        {
          input: "4 3\n1 1 2 0\n2 0 1 0\n3 0 1 0\n4 0 0 1",
          output: "2",
        },
      ],
      hints: [
        "K번 나라보다 (금,은,동) 순으로 큰 나라 수를 세세요",
        "등수 = 나보다 위인 사람 수 + 1",
        "먼저 K번 나라의 메달 정보를 찾으세요",
        "다른 모든 나라와 비교: 금이 더 많거나, 금 같고 은이 더 많거나, 금은 같고 동이 더 많으면",
        "rank = 나보다 (금,은,동) 순으로 큰 나라 수 + 1",
      ],
      solution: `const lines = input.split('\\n');
const [N, K] = lines[0].split(' ').map(Number);
const countries = [];
for (let i = 1; i <= N; i++) {
  const [id, g, s, b] = lines[i].split(' ').map(Number);
  countries.push({ id, g, s, b });
}
const me = countries.find(c => c.id === K);
let rank = 1;
for (const c of countries) {
  if (c.g > me.g || (c.g === me.g && c.s > me.s) || (c.g === me.g && c.s === me.s && c.b > me.b)) rank++;
}
console.log(rank);`,
      starter: `const lines = input.split('\\n');\nconst [N, K] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 1138,
      title: "한 줄로 서기",
      description: `N명이 키 순서(1~N)로 줄을 선다. 각 사람은 자기 앞에 자기보다 키가 큰 사람이 몇 명인지 안다.
이 정보를 바탕으로 줄 순서를 구하시오.

【입력】
첫째 줄: N
둘째 줄: 각 사람 앞의 큰 사람 수

【출력】
줄 선 순서`,
      testCases: [
        { input: "4\n2 1 1 0", output: "4 2 1 3" },
      ],
      hints: [
        "키가 큰 사람부터 (N부터 1까지) 배치하세요",
        "또는 키가 작은 사람부터 빈 자리에 삽입하세요",
        "키 N인 사람: 빈 자리 중 앞에서 (자신의값+1)번째에 삽입",
        "결과 배열에 splice로 해당 위치에 삽입",
        "for i=N downto 1: result.splice(info[i-1], 0, i) — 가장 큰 사람부터 넣으면 위치가 정확",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const info = lines[1].split(' ').map(Number);
const result = [];
for (let i = N; i >= 1; i--) {
  result.splice(info[i - 1], 0, i);
}
console.log(result.join(' '));`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 2669,
      title: "직사각형 네개의 합집합의 면적",
      description: `4개의 직사각형이 주어질 때, 합집합의 면적을 구하시오.
좌표는 1~100 범위.

【입력】
4줄: x1 y1 x2 y2

【출력】
합집합 면적`,
      testCases: [
        {
          input: "1 2 4 4\n2 3 5 7\n3 1 6 5\n7 3 8 6",
          output: "26",
        },
      ],
      hints: [
        "100×100 배열을 만들고 각 직사각형 영역을 표시하세요",
        "표시된 칸 수를 세면 면적입니다",
        "x1~x2-1, y1~y2-1 범위를 1로 채우세요",
        "4개 직사각형 모두 처리 후 1인 칸 카운트",
        "grid[x][y] = 1로 마킹, 마지막에 전체 합산",
      ],
      solution: `const lines = input.split('\\n');
const grid = Array.from({length: 101}, () => new Array(101).fill(0));
for (let i = 0; i < 4; i++) {
  const [x1, y1, x2, y2] = lines[i].split(' ').map(Number);
  for (let x = x1; x < x2; x++)
    for (let y = y1; y < y2; y++)
      grid[x][y] = 1;
}
let count = 0;
for (let x = 0; x < 101; x++)
  for (let y = 0; y < 101; y++)
    count += grid[x][y];
console.log(count);`,
      starter: `const lines = input.split('\\n');\n\n`,
    },
    {
      id: 2503,
      title: "숫자 야구",
      description: `1~9 서로 다른 3자리 수를 맞추는 게임. 질문과 결과(스트라이크, 볼)가 주어진다.
가능한 답의 개수를 구하시오.

【입력】
질문 수 N
다음 N줄: 숫자 스트라이크 볼

【출력】
가능한 답의 개수`,
      testCases: [
        { input: "2\n123 1 1\n356 1 0", output: "2" },
      ],
      hints: [
        "123~987 중 서로 다른 3자리 수를 모두 시도하세요 (완전탐색)",
        "각 후보에 대해 모든 질문의 스트라이크/볼이 맞는지 확인",
        "0이 포함된 수와 중복 숫자가 있는 수는 제외",
        "스트라이크: 같은 위치에 같은 숫자, 볼: 다른 위치에 같은 숫자",
        "모든 질문을 만족하는 후보 수를 카운트",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const queries = [];
for (let i = 1; i <= N; i++) {
  const [num, s, b] = lines[i].split(' ');
  queries.push({ num, s: Number(s), b: Number(b) });
}
let count = 0;
for (let n = 123; n <= 987; n++) {
  const ds = String(n);
  if (ds.includes('0')) continue;
  if (ds[0] === ds[1] || ds[1] === ds[2] || ds[0] === ds[2]) continue;
  let ok = true;
  for (const q of queries) {
    let s = 0, b = 0;
    for (let i = 0; i < 3; i++) {
      if (ds[i] === q.num[i]) s++;
      else if (q.num.includes(ds[i])) b++;
    }
    if (s !== q.s || b !== q.b) { ok = false; break; }
  }
  if (ok) count++;
}
console.log(count);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1652,
      title: "누울 자리를 찾아라",
      description: `N×N 방에 짐(X)과 빈칸(.)이 있다. 가로 또는 세로로 연속 2칸 이상 빈칸인 곳을 세시오.

【입력】
첫째 줄: N
다음 N줄: 방 상태

【출력】
가로 자리 수와 세로 자리 수 (공백 구분)`,
      testCases: [
        { input: "5\n....X\n..XX.\n.X...\nX...X\n.X...", output: "5 4" },
      ],
      hints: [
        "가로: 각 행에서 연속된 '.' 구간의 길이가 2 이상인 것을 세세요",
        "세로: 각 열에서 같은 방식으로 세세요",
        "'X'로 split하면 연속 '.' 그룹을 쉽게 구할 수 있어요",
        "각 그룹의 길이가 2 이상이면 카운트++",
        "가로: 행별로 split('X') 후 length>=2인 그룹 수, 세로: 열별로 동일 처리",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const grid = [];
for (let i = 1; i <= N; i++) grid.push(lines[i]);
let h = 0, v = 0;
for (let i = 0; i < N; i++) {
  grid[i].split('X').forEach(s => { if (s.length >= 2) h++; });
}
for (let j = 0; j < N; j++) {
  let col = '';
  for (let i = 0; i < N; i++) col += grid[i][j];
  col.split('X').forEach(s => { if (s.length >= 2) v++; });
}
console.log(h + ' ' + v);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1913,
      title: "달팽이",
      description: `N×N 배열을 달팽이 모양으로 채운다 (바깥에서 안으로, N²부터 1까지).
배열을 출력하고, 주어진 수의 좌표를 출력하시오.

【입력】
N (홀수, 3 ≤ N ≤ 999)
찾을 수

【출력】
N×N 배열
찾을 수의 행 열`,
      testCases: [
        {
          input: "3\n2",
          output: "9 2 3\n8 1 4\n7 6 5\n1 2",
        },
      ],
      hints: [
        "중앙(1)부터 시작해서 바깥으로 나가면서 채우세요",
        "또는 바깥부터 안으로 N²부터 1까지 채워도 됩니다",
        "방향 순서: 오→아래→왼→위 (또는 반대) 를 반복",
        "각 방향마다 이동 칸 수가 1,1,2,2,3,3... 패턴으로 증가",
        "중앙에서 시작, 값=1, 오른쪽1 아래1 왼쪽2 위2 오른쪽3 아래3... 순으로 채워나감",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const target = Number(lines[1]);
const grid = Array.from({length: N}, () => new Array(N).fill(0));
let r = Math.floor(N/2), c = Math.floor(N/2);
let val = 1;
grid[r][c] = val++;
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];
let dir = 0, step = 1;
while (val <= N * N) {
  for (let t = 0; t < 2 && val <= N * N; t++) {
    for (let s = 0; s < step && val <= N * N; s++) {
      r += dr[dir]; c += dc[dir];
      grid[r][c] = val++;
    }
    dir = (dir + 1) % 4;
  }
  step++;
}
let tr, tc;
const result = [];
for (let i = 0; i < N; i++) {
  result.push(grid[i].join(' '));
  for (let j = 0; j < N; j++) {
    if (grid[i][j] === target) { tr = i + 1; tc = j + 1; }
  }
}
console.log(result.join('\\n'));
console.log(tr + ' ' + tc);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 2491,
      title: "수열",
      description: `N개의 수로 이루어진 수열에서 연속으로 커지거나 연속으로 작아지는 부분의 최대 길이를 구하시오.

【입력】
첫째 줄: N
둘째 줄: 수열

【출력】
최대 길이`,
      testCases: [
        { input: "8\n2 1 3 4 5 6 7 1", output: "6" },
        { input: "5\n5 4 3 2 1", output: "5" },
      ],
      hints: [
        "증가 수열 길이와 감소 수열 길이를 따로 추적하세요",
        "현재 값이 이전보다 크면 증가 길이+1, 아니면 리셋",
        "같은 값이면 증가/감소 모두 1로 리셋",
        "매 단계에서 max를 갱신하세요",
        "inc=1, dec=1로 시작, arr[i]>arr[i-1]이면 inc++/dec=1, arr[i]<arr[i-1]이면 dec++/inc=1",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const arr = lines[1].split(' ').map(Number);
let inc = 1, dec = 1, maxLen = 1;
for (let i = 1; i < N; i++) {
  if (arr[i] > arr[i-1]) { inc++; dec = 1; }
  else if (arr[i] < arr[i-1]) { dec++; inc = 1; }
  else { inc = 1; dec = 1; }
  maxLen = Math.max(maxLen, inc, dec);
}
console.log(maxLen);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1251,
      title: "단어 나누기",
      description: `문자열을 3부분으로 나눈 후 각 부분을 뒤집어 이어붙인다.
사전순으로 가장 앞서는 결과를 출력하시오.

【입력】
문자열 (길이 3~200)

【출력】
사전순 가장 앞선 결과`,
      testCases: [
        { input: "mobitel", output: "bometil" },
        { input: "abc", output: "abc" },
      ],
      hints: [
        "3부분으로 나누는 모든 경우를 시도하세요 (2중 for문)",
        "각 부분을 뒤집고 이어붙인 결과 중 최솟값을 찾으세요",
        "첫 번째 자르기 위치 i: 1~len-2, 두 번째 j: i+1~len-1",
        "s.slice(0,i).reverse + s.slice(i,j).reverse + s.slice(j).reverse",
        "모든 (i,j) 조합에서 결과를 구하고 사전순 최소값 출력",
      ],
      solution: `const s = input;
const rev = str => str.split('').reverse().join('');
let best = null;
for (let i = 1; i < s.length - 1; i++) {
  for (let j = i + 1; j < s.length; j++) {
    const result = rev(s.slice(0, i)) + rev(s.slice(i, j)) + rev(s.slice(j));
    if (best === null || result < best) best = result;
  }
}
console.log(best);`,
      starter: `const s = input;\n\n`,
    },
    {
      id: 2828,
      title: "사과 담기 게임",
      description: `1~N칸 스크린에 M칸 바구니가 있다. 사과가 떨어질 때 바구니 이동 최소 횟수를 구하시오.

【입력】
첫째 줄: N M (스크린 크기, 바구니 크기)
둘째 줄: 사과 수 J
다음 J줄: 사과 위치

【출력】
이동 최소 횟수`,
      testCases: [
        { input: "5 1\n3\n1\n5\n3", output: "6" },
        { input: "5 3\n2\n1\n5", output: "2" },
      ],
      hints: [
        "바구니의 왼쪽 끝과 오른쪽 끝을 추적하세요",
        "사과가 범위 밖이면 최소한만 이동시키세요",
        "사과 위치가 left보다 작으면 왼쪽으로 이동, right보다 크면 오른쪽",
        "이동량 = 범위를 벗어난 만큼만",
        "if(pos<left) move=left-pos, left-=move, right-=move / if(pos>right) move=pos-right, left+=move, right+=move",
      ],
      solution: `const lines = input.split('\\n');
const [N, M] = lines[0].split(' ').map(Number);
const J = Number(lines[1]);
let left = 1, right = M;
let total = 0;
for (let i = 0; i < J; i++) {
  const pos = Number(lines[2 + i]);
  if (pos < left) { total += left - pos; right -= left - pos; left = pos; }
  else if (pos > right) { total += pos - right; left += pos - right; right = pos; }
}
console.log(total);`,
      starter: `const lines = input.split('\\n');\nconst [N, M] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 2628,
      title: "종이자르기",
      description: `가로W, 세로H 종이를 점선을 따라 잘라 가장 큰 조각의 넓이를 구하시오.

【입력】
첫째 줄: W H
둘째 줄: 자르는 횟수 N
다음 N줄: 0/1 위치 (0=가로줄, 1=세로줄)

【출력】
가장 큰 조각 넓이`,
      testCases: [
        { input: "4 4\n2\n0 3\n1 2", output: "6" },
      ],
      hints: [
        "가로/세로 자르는 위치를 각각 모으세요",
        "0과 W(또는 H) 포함해서 정렬 후 인접 차이의 최대를 구하세요",
        "가로줄(0)은 세로를 자르고, 세로줄(1)은 가로를 자릅니다",
        "각 방향 자르기 위치에 0과 끝(W/H)을 추가 후 정렬",
        "인접 차이 최대(가로) × 인접 차이 최대(세로) = 가장 큰 조각",
      ],
      solution: `const lines = input.split('\\n');
const [W, H] = lines[0].split(' ').map(Number);
const N = Number(lines[1]);
const hCuts = [0, H], vCuts = [0, W];
for (let i = 0; i < N; i++) {
  const [dir, pos] = lines[2 + i].split(' ').map(Number);
  if (dir === 0) hCuts.push(pos);
  else vCuts.push(pos);
}
hCuts.sort((a, b) => a - b);
vCuts.sort((a, b) => a - b);
let maxH = 0, maxV = 0;
for (let i = 1; i < hCuts.length; i++) maxH = Math.max(maxH, hCuts[i] - hCuts[i-1]);
for (let i = 1; i < vCuts.length; i++) maxV = Math.max(maxV, vCuts[i] - vCuts[i-1]);
console.log(maxH * maxV);`,
      starter: `const lines = input.split('\\n');\nconst [W, H] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 16922,
      title: "로마 숫자 만들기",
      description: `I=1, V=5, X=10, L=50.
N개를 사용하여 만들 수 있는 서로 다른 수의 개수를 구하시오.

【입력】
N (1 ≤ N ≤ 20)

【출력】
서로 다른 수의 개수`,
      testCases: [
        { input: "1", output: "4" },
        { input: "2", output: "10" },
      ],
      hints: [
        "중복을 방지하려면 I→V→X→L 순서로만 사용하세요",
        "I를 i개, V를 j개, X를 k개 쓰면 L은 N-i-j-k개",
        "4중 for문으로 모든 조합을 탐색하세요",
        "i+j+k <= N 조건에서 l = N-i-j-k",
        "Set에 결과를 넣어 중복 제거 후 size 출력",
      ],
      solution: `const N = Number(input);
const s = new Set();
for (let i = 0; i <= N; i++)
  for (let j = 0; j <= N - i; j++)
    for (let k = 0; k <= N - i - j; k++) {
      const l = N - i - j - k;
      s.add(i * 1 + j * 5 + k * 10 + l * 50);
    }
console.log(s.size);`,
      starter: `const N = Number(input);\n\n`,
    },
    {
      id: 3085,
      title: "사탕 게임",
      description: `N×N 보드에 사탕이 있다. 인접한 두 칸을 교환하여 같은 색 사탕이 연속하는 최대 길이를 구하시오.

【입력】
첫째 줄: N (3 ≤ N ≤ 50)
다음 N줄: 보드 (C,P,Z,Y)

【출력】
먹을 수 있는 사탕의 최대 개수`,
      testCases: [
        { input: "3\nCCP\nCCP\nPPC", output: "3" },
        { input: "4\nPPPP\nCYZP\nCCPP\nYYCC", output: "4" },
      ],
      hints: [
        "모든 인접한 두 칸을 교환해보고, 최대 연속 길이를 구하세요",
        "교환 후 모든 행/열에서 연속된 같은 문자의 최대 길이를 체크",
        "가로 인접과 세로 인접 모두 시도하세요",
        "교환 → 체크 → 다시 원래대로 복구 → 반복",
        "체크 함수: 모든 행/열을 순회하며 연속 같은 문자 최대 길이 반환",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const board = [];
for (let i = 1; i <= N; i++) board.push(lines[i].split(''));
function check() {
  let mx = 1;
  for (let i = 0; i < N; i++) {
    let cnt = 1;
    for (let j = 1; j < N; j++) {
      if (board[i][j] === board[i][j-1]) cnt++;
      else cnt = 1;
      mx = Math.max(mx, cnt);
    }
    cnt = 1;
    for (let j = 1; j < N; j++) {
      if (board[j][i] === board[j-1][i]) cnt++;
      else cnt = 1;
      mx = Math.max(mx, cnt);
    }
  }
  return mx;
}
let ans = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (j + 1 < N) {
      [board[i][j], board[i][j+1]] = [board[i][j+1], board[i][j]];
      ans = Math.max(ans, check());
      [board[i][j], board[i][j+1]] = [board[i][j+1], board[i][j]];
    }
    if (i + 1 < N) {
      [board[i][j], board[i+1][j]] = [board[i+1][j], board[i][j]];
      ans = Math.max(ans, check());
      [board[i][j], board[i+1][j]] = [board[i+1][j], board[i][j]];
    }
  }
}
console.log(ans);`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 13335,
      title: "트럭",
      description: `N대의 트럭이 길이 W, 최대하중 L인 다리를 건넌다.
트럭은 순서대로 건너며, 다리 위 트럭 무게 합이 L 이하여야 한다.
모든 트럭이 건너는 최소 시간을 구하시오.

【입력】
N W L
트럭 무게들

【출력】
최소 시간`,
      testCases: [
        { input: "4 2 10\n7 4 5 6", output: "8" },
        { input: "1 100 100\n10", output: "101" },
        { input: "10 100 100\n10 10 10 10 10 10 10 10 10 10", output: "110" },
      ],
      hints: [
        "큐로 다리를 시뮬레이션하세요 (길이 W의 큐)",
        "매 초마다: 큐에서 나가고, 새 트럭이 들어갈 수 있으면 넣기",
        "큐에 0을 넣어서 빈 칸을 표현하면 편해요",
        "큐 길이가 W이면 앞에서 하나 빼고, 새 트럭+현재 무게 <= L이면 push",
        "매 초 time++, 큐가 비고 모든 트럭이 건너면 종료",
      ],
      solution: `const lines = input.split('\\n');
const [N, W, L] = lines[0].split(' ').map(Number);
const trucks = lines[1].split(' ').map(Number);
const bridge = new Array(W).fill(0);
let time = 0, idx = 0, weight = 0;
while (idx < N || weight > 0) {
  time++;
  weight -= bridge.shift();
  if (idx < N && weight + trucks[idx] <= L) {
    bridge.push(trucks[idx]);
    weight += trucks[idx];
    idx++;
  } else {
    bridge.push(0);
  }
}
console.log(time);`,
      starter: `const lines = input.split('\\n');\nconst [N, W, L] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 18111,
      title: "마인크래프트",
      description: `N×M 땅의 높이가 주어진다. 모든 칸을 같은 높이로 만들 때 최소 시간을 구하시오.
인벤토리에 B개의 블록. 블록 제거=2초, 블록 설치=1초.
같은 시간이면 높이가 가장 높은 것 선택.

【입력】
N M B
다음 N줄: 높이 배열

【출력】
최소 시간과 높이`,
      testCases: [
        { input: "3 4 99\n0 0 0 0\n0 0 0 0\n0 0 0 1", output: "2 0" },
        { input: "3 4 1\n64 64 64 64\n64 64 64 64\n64 64 64 63", output: "1 64" },
      ],
      hints: [
        "목표 높이를 0~256까지 모두 시도하세요 (완전탐색)",
        "각 높이에서 필요한 시간과 블록 수를 계산",
        "높이보다 높은 칸: 제거(2초×차이), 낮은 칸: 설치(1초×차이)",
        "제거한 블록 + 인벤토리 >= 설치할 블록 이어야 가능",
        "가능한 높이 중 시간 최소, 같은 시간이면 높이 최대 선택",
      ],
      solution: `const lines = input.split('\\n');
const [N, M, B] = lines[0].split(' ').map(Number);
const heights = [];
for (let i = 1; i <= N; i++) {
  heights.push(...lines[i].split(' ').map(Number));
}
let bestTime = Infinity, bestH = 0;
for (let h = 0; h <= 256; h++) {
  let remove = 0, place = 0;
  for (const v of heights) {
    if (v > h) remove += v - h;
    else place += h - v;
  }
  if (remove + B >= place) {
    const time = remove * 2 + place;
    if (time < bestTime || (time === bestTime && h > bestH)) {
      bestTime = time;
      bestH = h;
    }
  }
}
console.log(bestTime + ' ' + bestH);`,
      starter: `const lines = input.split('\\n');\nconst [N, M, B] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 2578,
      title: "빙고",
      description: `5×5 빙고판에서 사회자가 부르는 수를 차례로 지운다.
빙고 3줄이 되는 순간 몇 번째 수인지 출력하시오.
(가로, 세로, 대각선 모두 지워지면 1줄)

【입력】
5줄: 내 빙고판 (5×5)
5줄: 사회자가 부르는 순서 (25개)

【출력】
빙고 3줄이 되는 순간의 번째`,
      testCases: [
        {
          input: "11 12 2 24 10\n16 1 13 3 25\n6 20 5 21 17\n19 4 8 14 9\n22 15 7 23 18\n5 10 7 16 2\n4 22 8 17 13\n3 18 1 6 25\n12 19 23 14 21\n11 24 9 20 15",
          output: "15",
        },
      ],
      hints: [
        "빙고판에서 불린 수의 위치를 찾아 표시하세요",
        "매번 가로5줄, 세로5줄, 대각선2줄 체크해서 완성된 줄 수를 세세요",
        "marked[5][5] 배열로 지워진 위치를 관리",
        "빙고 줄 수가 3 이상이면 그 순간의 번호를 출력",
        "가로: 행별 합==5, 세로: 열별 합==5, 대각: (0,0)~(4,4)와 (0,4)~(4,0) 체크",
      ],
      solution: `const lines = input.split('\\n');
const board = [];
for (let i = 0; i < 5; i++) board.push(lines[i].split(' ').map(Number));
const calls = [];
for (let i = 5; i < 10; i++) calls.push(...lines[i].split(' ').map(Number));
const marked = Array.from({length: 5}, () => new Array(5).fill(false));
const pos = {};
for (let i = 0; i < 5; i++)
  for (let j = 0; j < 5; j++)
    pos[board[i][j]] = [i, j];
for (let t = 0; t < 25; t++) {
  const [r, c] = pos[calls[t]];
  marked[r][c] = true;
  let bingo = 0;
  for (let i = 0; i < 5; i++) {
    if (marked[i].every(v => v)) bingo++;
    if (marked.every(row => row[i])) bingo++;
  }
  if ([0,1,2,3,4].every(i => marked[i][i])) bingo++;
  if ([0,1,2,3,4].every(i => marked[i][4-i])) bingo++;
  if (bingo >= 3) { console.log(t + 1); return; }
}`,
      starter: `const lines = input.split('\\n');\n\n`,
    },
    {
      id: 1063,
      title: "킹",
      description: `8×8 체스판에서 킹과 돌의 위치가 주어진다.
킹을 이동시킬 때, 돌과 같은 위치로 가면 돌을 민다.
이동 후 킹과 돌이 체스판 밖이면 이동하지 않는다.

이동: R,L,B,T,RT,LT,RB,LB

【입력】
킹위치 돌위치 이동횟수 N
다음 N줄: 이동 방향

【출력】
킹과 돌의 최종 위치`,
      testCases: [
        { input: "A1 A2 5\nB\nL\nLB\nRB\nLT", output: "A1\nA2" },
      ],
      hints: [
        "위치를 (열, 행) 숫자로 변환해서 처리하세요",
        "킹 이동 후 돌과 겹치면 돌도 같은 방향으로 이동. 범위 체크 주의",
        "방향별 dx,dy를 매핑하세요 (R=+1,0 L=-1,0 T=0,+1 B=0,-1 등)",
        "이동 후 범위(1~8) 체크: 킹 또는 돌이 벗어나면 이동 취소",
        "킹과 돌이 겹치면 돌도 같은 방향으로 한 칸 이동, 돌이 범위 밖이면 전체 취소",
      ],
      solution: `const lines = input.split('\\n');
const [kingPos, stonePos, N] = lines[0].split(' ');
let kc = kingPos.charCodeAt(0) - 64, kr = Number(kingPos[1]);
let sc = stonePos.charCodeAt(0) - 64, sr = Number(stonePos[1]);
const dir = { R:[1,0], L:[-1,0], B:[0,-1], T:[0,1], RT:[1,1], LT:[-1,1], RB:[1,-1], LB:[-1,-1] };
for (let i = 1; i <= Number(N); i++) {
  const [dc, dr] = dir[lines[i]];
  const nkc = kc + dc, nkr = kr + dr;
  if (nkc < 1 || nkc > 8 || nkr < 1 || nkr > 8) continue;
  let nsc = sc, nsr = sr;
  if (nkc === sc && nkr === sr) {
    nsc = sc + dc; nsr = sr + dr;
    if (nsc < 1 || nsc > 8 || nsr < 1 || nsr > 8) continue;
  }
  kc = nkc; kr = nkr; sc = nsc; sr = nsr;
}
console.log(String.fromCharCode(64 + kc) + kr);
console.log(String.fromCharCode(64 + sc) + sr);`,
      starter: `const lines = input.split('\\n');\nconst [kingPos, stonePos, N] = lines[0].split(' ');\n\n`,
    },
    {
      id: 16173,
      title: "점프왕 쩰리 (Small)",
      description: `N×N 격자에서 (1,1)에서 (N,N)까지 도달할 수 있는지 판별.
각 칸의 숫자만큼 오른쪽 또는 아래로 점프 가능. -1은 도착점.

【입력】
N
N×N 격자

【출력】
도달 가능하면 "HaruHaru", 아니면 "Hing"`,
      testCases: [
        { input: "3\n1 1 10\n1 5 1\n2 2 -1", output: "HaruHaru" },
        { input: "3\n2 2 1\n2 2 2\n1 2 -1", output: "Hing" },
      ],
      hints: [
        "BFS나 DFS로 (0,0)에서 시작해서 도달 가능한지 탐색",
        "오른쪽(+jump,0)과 아래(0,+jump)만 시도하세요",
        "방문 배열로 중복 방문을 방지하세요",
        "grid[r][c]가 -1이면 도착점이므로 성공",
        "큐에 (0,0) 넣고, 각 칸에서 jump만큼 오른쪽/아래 이동 시도",
      ],
      solution: `const lines = input.split('\\n');
const N = Number(lines[0]);
const grid = [];
for (let i = 1; i <= N; i++) grid.push(lines[i].split(' ').map(Number));
const visited = Array.from({length: N}, () => new Array(N).fill(false));
const queue = [[0, 0]];
visited[0][0] = true;
while (queue.length > 0) {
  const [r, c] = queue.shift();
  if (grid[r][c] === -1) { console.log('HaruHaru'); return; }
  const jump = grid[r][c];
  if (r + jump < N && !visited[r + jump][c]) { visited[r + jump][c] = true; queue.push([r + jump, c]); }
  if (c + jump < N && !visited[r][c + jump]) { visited[r][c + jump] = true; queue.push([r, c + jump]); }
}
console.log('Hing');`,
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
];
