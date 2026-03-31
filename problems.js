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
      ],
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
        "6+9의 합을 Math.ceil로 2로 나누면 됩니다",
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
        {
          input: "baekjoon online judge",
          output: "noojkeab enilno egduj",
        },
        {
          input: "<open>tag<close>",
          output: "<open>gat<close>",
        },
        {
          input: "<ab cd>ef gh<ij kl>",
          output: "<ab cd>fe hg<ij kl>",
        },
      ],
      hints: [
        "태그 안인지 밖인지 상태를 추적하세요",
        "태그 밖에서 공백이나 '<'를 만나면 지금까지 모은 단어를 뒤집어서 추가",
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
      starter: `const lines = input.split('\\n');\nconst [W, H] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 1783,
      title: "병든 나이트",
      description: `체스판이 N×M이다. 나이트는 (1,1)에서 출발하며 오른쪽으로만 이동 가능.
이동 방법: (2칸 위,1칸 오른), (1칸 위,2칸 오른), (1칸 아래,2칸 오른), (2칸 아래,1칸 오른)
방문할 수 있는 칸의 최대 개수를 구하시오.

【입력】
N M (1 ≤ N, M ≤ 2×10⁹)

【출력】
최대 방문 칸 수`,
      testCases: [
        { input: "100 50", output: "48" },
        { input: "2 4", output: "2" },
        { input: "1 1", output: "1" },
      ],
      hints: [
        "N이 1이면 1, N이 2이면 min(4, (M+1)/2)를 기준으로 생각하세요",
        "N≥3이면 M에 따라 4가지 이동을 모두 쓸 수 있는지 판단",
      ],
      starter: `const [N, M] = input.split(' ').map(Number);\n\n`,
    },
    {
      id: 1969,
      title: "DNA",
      description: `N개의 길이 M DNA 문자열이 주어진다.
각 위치에서 가장 많이 등장하는 문자를 선택하여 Hamming Distance 합이 최소인 문자열을 구하시오.
(같은 빈도면 사전순 앞선 것)

【입력】
첫째 줄: N M
다음 N줄: DNA 문자열

【출력】
결과 문자열과 Hamming Distance 합`,
      testCases: [
        { input: "5 8\nTATGATAC\nTAGGATAC\nGATGATAA\nAATGATCC\nGATGATAC", output: "AATGATAC\n7" },
      ],
      hints: [
        "각 열마다 A,C,G,T 빈도를 세서 가장 많은 것을 선택하세요",
        "같은 빈도면 A < C < G < T 사전순으로 선택",
      ],
      starter: `const lines = input.split('\\n');\nconst [N, M] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 10709,
      title: "기상캐스터",
      description: `H×W 격자에서 'c'는 구름, '.'은 맑음. 구름은 매 분 오른쪽으로 1칸 이동.
각 칸에 처음 구름이 오는 시간을 출력하시오 (오지 않으면 -1).

【입력】
첫째 줄: H W
다음 H줄: 격자

【출력】
각 칸의 시간`,
      testCases: [
        {
          input: "3 4\nc...\n....\n.c..",
          output: "0 1 2 3\n-1 -1 -1 -1\n-1 0 1 2",
        },
      ],
      hints: [
        "각 행별로 왼쪽에서 오른쪽으로 스캔하세요",
        "'c'를 만나면 그 위치는 0, 이후 칸은 거리만큼 시간 증가",
      ],
      starter: `const lines = input.split('\\n');\nconst [H, W] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 8911,
      title: "거북이",
      description: `거북이가 명령에 따라 이동한다. F=전진, B=후진, L=좌회전, R=우회전.
거북이가 지나간 영역의 최소 직사각형 넓이를 구하시오.

【입력】
테스트케이스 수 T
각 케이스: 명령 문자열

【출력】
각 케이스의 넓이`,
      testCases: [
        { input: "2\nFFFFRFFFF\nLLLLRRRRFFFF", output: "16\n0" },
      ],
      hints: [
        "방향에 따라 dx,dy를 설정하고 이동하며 x,y 최대/최소를 추적",
        "넓이 = (maxX-minX) × (maxY-minY)",
      ],
      starter: `const lines = input.split('\\n');\nconst T = Number(lines[0]);\n\n`,
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
      ],
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
      ],
      starter: `const lines = input.split('\\n');\nconst [kingPos, stonePos, N] = lines[0].split(' ');\n\n`,
    },
    {
      id: 10431,
      title: "줄세우기",
      description: `학생 20명이 차례로 줄을 선다. 새 학생이 오면 자기보다 큰 학생 앞에 선다.
이때 뒤로 밀려나는 총 횟수를 구하시오.

【입력】
테스트케이스 수 T
각 줄: 케이스번호 + 20명의 키

【출력】
각 케이스: 케이스번호 뒤로 밀려난 총 횟수`,
      testCases: [
        {
          input: "1\n1 900 901 902 903 904 905 906 907 908 909 910 911 912 913 914 915 916 917 918 919",
          output: "1 0",
        },
      ],
      hints: [
        "삽입 정렬과 같은 원리입니다",
        "새 학생보다 키가 큰 학생 수 = 밀려나는 횟수",
      ],
      starter: `const lines = input.split('\\n');\nconst T = Number(lines[0]);\n\n`,
    },
    {
      id: 2659,
      title: "십자카드 문제",
      description: `십자 모양 카드에 4개의 숫자(0~9)가 적혀있다.
시계방향으로 읽어 4자리 수를 만들 수 있다 (4가지 회전).
그 중 최솟값보다 작은 4자리 수 중 십자카드로 만들 수 없는 수의 개수를 구하시오.

【입력】
4개의 숫자 (위, 오른, 아래, 왼)

【출력】
최솟값보다 작은 불가능한 수의 개수`,
      testCases: [
        { input: "1 2 3 4", output: "3" },
        { input: "0 0 0 0", output: "0" },
      ],
      hints: [
        "4회전의 최솟값을 먼저 구하세요",
        "1111부터 최솟값-1까지 각 수가 어떤 십자카드로 가능한지 확인",
      ],
      starter: `const nums = input.split(' ').map(Number);\n\n`,
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
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 2477,
      title: "참외밭",
      description: `ㄱ자 모양 밭에 참외가 심어져 있다. 1m²당 K개.
6개의 변 정보(방향, 길이)로 밭의 넓이를 구하시오.

방향: 1=동, 2=서, 3=남, 4=북

【입력】
K
6줄: 방향 길이

【출력】
참외 수 (넓이 × K)`,
      testCases: [
        { input: "7\n4 50\n1 160\n3 30\n1 60\n3 20\n2 220", output: "47600" },
      ],
      hints: [
        "ㄱ자 = 큰 직사각형 - 작은 직사각형",
        "가장 긴 가로변과 가장 긴 세로변이 큰 직사각형의 변",
      ],
      starter: `const lines = input.split('\\n');\nconst K = Number(lines[0]);\n\n`,
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
      ],
      starter: `const lines = input.split('\\n');\nconst [N, W, L] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 2304,
      title: "창고 다각형",
      description: `기둥들의 위치와 높이가 주어진다. 지붕은 기둥 꼭대기를 연결하되, 오르막은 왼쪽에서 올라가고 내리막은 오른쪽에서 내려간다. 지붕의 면적을 구하시오.

【입력】
기둥 수 N
다음 N줄: 위치 높이

【출력】
면적`,
      testCases: [
        { input: "7\n2 4\n11 4\n15 8\n4 6\n5 3\n8 10\n13 6", output: "98" },
      ],
      hints: [
        "가장 높은 기둥을 기준으로 왼쪽/오른쪽을 나눠서 처리하세요",
        "왼쪽: 왼쪽에서 오른쪽으로 최대 높이 갱신하며 면적 누적",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1205,
      title: "등수 구하기",
      description: `N명의 점수와 새 점수가 주어진다. 랭킹리스트 최대 P명.
새 점수의 등수를 구하시오. 점수가 같으면 같은 등수.
리스트가 꽉 차고 마지막과 같은 점수면 등록 불가(-1).

【입력】
N P (현재 인원, 최대 인원)
현재 점수들 (없으면 빈 줄)
새 점수

【출력】
등수 또는 -1`,
      testCases: [
        { input: "3 5\n100 90 80\n100", output: "1" },
        { input: "3 3\n100 90 80\n80", output: "-1" },
        { input: "0 10\n\n1000", output: "1" },
      ],
      hints: [
        "정렬된 점수에서 새 점수보다 큰 것의 수 + 1이 등수",
        "N이 P이고 새 점수가 마지막과 같거나 작으면 -1",
      ],
      starter: `const lines = input.split('\\n');\nconst [N, P] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 2331,
      title: "반복수열",
      description: `A부터 시작하여 각 자릿수의 P제곱의 합으로 다음 수를 만든다.
반복되는 부분이 나타나면, 반복 순환에 포함되지 않는 수의 개수를 출력.

【입력】
A P

【출력】
반복 전 수의 개수`,
      testCases: [
        { input: "57 2", output: "2" },
        { input: "1 5", output: "0" },
      ],
      hints: [
        "수열을 만들며 배열에 저장하세요",
        "이미 나온 수가 다시 나오면, 그 수의 첫 등장 인덱스가 답",
      ],
      starter: `const [A, P] = input.split(' ').map(Number);\n\n`,
    },
    {
      id: 30804,
      title: "과일 탕후루",
      description: `N개의 과일이 꼬치에 꽂혀있다. 앞/뒤에서만 빼서 과일 종류를 2가지 이하로 만들 때,
남길 수 있는 최대 과일 수를 구하시오.

【입력】
N
과일 종류 배열

【출력】
최대 과일 수`,
      testCases: [
        { input: "5\n1 2 3 2 1", output: "3" },
        { input: "8\n1 2 1 2 1 2 1 2", output: "8" },
      ],
      hints: [
        "투 포인터(슬라이딩 윈도우)를 사용하세요",
        "구간 내 과일 종류가 2 이하인 최대 길이를 구하세요",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1713,
      title: "후보 추천하기",
      description: `비어있는 N개 사진틀에 추천 받은 학생 사진을 건다.
틀이 꽉 차면 추천수 가장 적은 학생을 내린다 (동률시 가장 오래된 학생).
최종 사진틀의 학생 번호를 오름차순 출력.

【입력】
N (사진틀 수)
추천 횟수
추천 학생 번호들

【출력】
최종 사진틀 학생 번호 (오름차순)`,
      testCases: [
        { input: "3\n9\n2 1 4 3 5 6 2 7 2", output: "2 6 7" },
      ],
      hints: [
        "각 학생의 추천수와 게시 시간을 관리하세요",
        "이미 있으면 추천수+1, 없으면 최소 추천수 학생 교체",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
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
      ],
      starter: `const lines = input.split('\\n');\nconst [N, M, B] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 16918,
      title: "봄버맨",
      description: `R×C 격자에 폭탄이 놓여있다. 봄버맨의 행동:
0초: 초기 상태
1초: 아무것도 안 함
2초: 빈 칸에 폭탄 설치
3초: 3초 전 폭탄 폭발 (상하좌우 포함)
이후 2,3을 반복. N초 후 상태를 출력.

【입력】
R C N
격자 (.=빈칸, O=폭탄)

【출력】
N초 후 상태`,
      testCases: [
        {
          input: "6 7 3\n.......\n...O...\n....O..\n.......\n.......\nOO.....",
          output: "OOO.OOO\nOO...OO\nOOO...O\n..OO.OO\nOO.OOOO\nOO.OO..",
        },
      ],
      hints: [
        "폭탄 설치 시간을 기록하세요",
        "N이 1이면 초기상태, 짝수면 전부 폭탄, 홀수면 패턴 반복",
      ],
      starter: `const lines = input.split('\\n');\nconst [R, C, N] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 2564,
      title: "경비원",
      description: `직사각형 블록 가장자리에 상점들과 동근이 집이 있다.
동근이가 블록 가장자리를 따라 각 상점까지의 최단 거리 합을 구하시오.

【입력】
가로 세로
상점 수
각 상점: 방향 거리
동근이 집: 방향 거리

【출력】
최단 거리 합`,
      testCases: [
        { input: "10 5\n3\n1 4\n3 2\n2 8\n2 3", output: "14" },
      ],
      hints: [
        "둘레를 따라 시계/반시계 두 방향 중 짧은 쪽을 선택",
        "각 위치를 둘레 위의 1차원 좌표로 변환하세요",
      ],
      starter: `const lines = input.split('\\n');\nconst [W, H] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 13414,
      title: "수강신청",
      description: `K과목, L번의 클릭 기록이 주어진다.
같은 학생이 여러 번 클릭하면 마지막 클릭만 유효.
선착순 K명을 출력.

【입력】
K L
다음 L줄: 학번

【출력】
수강 성공 학생 (최대 K명)`,
      testCases: [
        { input: "3 5\n1\n2\n3\n2\n4", output: "1\n3\n2" },
      ],
      hints: [
        "중복 클릭을 제거하되 마지막 클릭 순서를 유지해야 합니다",
        "Map이나 Set을 활용하세요. 기존 기록 삭제 후 재삽입",
      ],
      starter: `const lines = input.split('\\n');\nconst [K, L] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 2567,
      title: "색종이 - 2",
      description: `100×100 도화지에 10×10 색종이를 여러 장 붙인다.
색종이 둘레의 총 길이를 구하시오.

【입력】
색종이 수 N
다음 N줄: x y

【출력】
둘레 길이`,
      testCases: [
        { input: "4\n3 7\n5 2\n15 7\n13 14", output: "96" },
      ],
      hints: [
        "100×100 배열에 색종이 영역을 채운 후",
        "각 칸의 4변을 확인해서 바깥(또는 빈칸)과 접하면 둘레+1",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 17266,
      title: "어두운 굴다리",
      description: `0부터 N까지의 굴다리에 M개의 가로등이 있다.
모든 지점을 밝히려면 가로등 높이(= 밝히는 반경)의 최솟값을 구하시오.

【입력】
N
M
가로등 위치들

【출력】
최소 높이`,
      testCases: [
        { input: "5\n2\n2 4", output: "2" },
        { input: "10\n3\n3 5 7", output: "3" },
      ],
      hints: [
        "이분 탐색으로 높이를 정하고, 모든 구간을 커버하는지 확인",
        "또는 인접 가로등 사이 거리와 양 끝 거리로 직접 계산",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
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
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 2002,
      title: "추월",
      description: `터널에 들어간 순서와 나온 순서가 주어진다.
터널 안에서 추월한 차의 대수를 구하시오.

【입력】
N
N줄: 들어간 순서
N줄: 나온 순서

【출력】
추월한 차 수`,
      testCases: [
        {
          input: "4\nZG431SN\nZG5765M\nZG9ABA\nZG2345B\nZG2345B\nZG431SN\nZG9ABA\nZG5765M",
          output: "2",
        },
      ],
      hints: [
        "나온 순서에서, 들어간 순서 기준으로 앞선 차보다 먼저 나왔으면 추월",
        "들어간 순서를 인덱스로 변환해서 비교하세요",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 2852,
      title: "NBA 농구",
      description: `NBA 농구 경기에서 팀1과 팀2가 득점한 시간이 주어진다.
각 팀이 이기고 있던 총 시간을 구하시오.

【입력】
N (득점 수)
N줄: 팀번호 시간(MM:SS)

【출력】
팀1 리드 시간
팀2 리드 시간 (MM:SS 형식)`,
      testCases: [
        {
          input: "4\n1 01:10\n2 21:10\n2 31:30\n1 41:40",
          output: "20:00\n10:30",
        },
      ],
      hints: [
        "시간을 초 단위로 변환해서 계산하세요",
        "각 득점 시점마다 이전 상태(리드 팀)에 따라 시간을 누적",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
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
      ],
      starter: `const N = Number(input);\n\n`,
    },
    {
      id: 17952,
      title: "과제는 끝나지 않아!",
      description: `N분 동안 매 분마다 새 과제가 나올 수 있다.
새 과제가 나오면 현재 하던 것을 보류하고 새 과제부터.
과제 완료시 점수 획득. 보류된 과제는 가장 최근 것부터 이어서.

【입력】
N
N줄: 1 점수 시간 (새 과제) 또는 0 (과제 없음)

【출력】
획득 총점`,
      testCases: [
        { input: "6\n1 40 3\n0\n0\n1 100 2\n0\n0", output: "140" },
      ],
      hints: [
        "스택으로 보류 과제를 관리하세요",
        "새 과제가 오면 push, 현재 과제 완료하면 pop",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 1283,
      title: "단축키 지정",
      description: `N개의 옵션에 단축키를 지정한다.
1. 각 단어의 첫 글자 중 아직 지정 안 된 것 선택
2. 없으면 왼쪽부터 하나씩 보며 지정 안 된 것 선택
3. 그래도 없으면 단축키 없음
단축키 글자는 [X]로 표시.

【입력】
N
N줄: 옵션 이름

【출력】
단축키 표시된 옵션`,
      testCases: [
        {
          input: "5\nNew\nOpen\nSave\nSave As\nSave All",
          output: "[N]ew\n[O]pen\n[S]ave\nSave [A]s\nSa[v]e All",
        },
      ],
      hints: [
        "각 단어의 첫 글자를 우선 체크하세요 (대소문자 무시)",
        "이미 사용된 문자는 Set으로 관리",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 20006,
      title: "랭킹전 대기열",
      description: `N명의 플레이어가 방에 배정된다. 방 크기 m.
레이팅 차이 10 이내면 같은 방. 방이 꽉 차면 게임 시작.
방에 못 들어가면 새 방.

【입력】
N m (총 인원, 방 크기)
N줄: 레이팅 닉네임

【출력】
각 방의 상태 (닉네임 사전순, 시작/대기 표시)`,
      testCases: [
        {
          input: "10 5\n1500 Faker\n1500 Teddy\n1500 CloZer\n1500 Bdd\n1500 Kiin\n1500 Deft\n1490 Gumayusi\n1400 Kellin\n1505 Showmaker\n1510 Chovy",
          output: "Bdd\nCloZer\nFaker\nKiin\nTeddy\nStarted!\nChovy\nDeft\nGumayusi\nShowmaker\nWaiting!\nKellin\nWaiting!",
        },
      ],
      hints: [
        "첫 입장자의 레이팅 기준으로 ±10 이내만 같은 방",
        "방이 m명이면 Started!, 아니면 Waiting!",
      ],
      starter: `const lines = input.split('\\n');\nconst [N, m] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 19583,
      title: "싸이버개강총회",
      description: `개강총회 시작(S), 끝(E), 스트리밍끝(Q) 시간이 주어진다.
S 이전에 입장 AND E~Q 사이에 퇴장한 사람 수를 구하시오.

【입력】
S E Q (HH:MM 형식)
다음 줄들: 시간 닉네임

【출력】
출석 인정 인원 수`,
      testCases: [
        {
          input: "22:00 23:00 23:30\n21:30 malkoring\n22:00 malkoring\n23:10 malkoring\n21:00 person1\n22:00 person1\n23:00 person2\n23:15 person2",
          output: "2",
        },
      ],
      hints: [
        "입장: S 이전(포함) 첫 기록, 퇴장: E~Q 사이(포함) 기록",
        "Map으로 각 사람의 입장/퇴장을 추적하세요",
      ],
      starter: `const lines = input.split('\\n');\nconst [S, E, Q] = lines[0].split(' ');\n\n`,
    },
    {
      id: 1817,
      title: "짐 챙기는 숌",
      description: `무게 제한 C인 가방에 N개의 짐을 넣는다.
짐은 주어진 순서대로 넣되, 현재 가방에 안 들어가면 새 가방.
필요한 가방의 최소 수를 구하시오.

【입력】
C (가방 무게 제한, ≤ 10000)
N (짐 수, ≤ 1000, 0이면 가방 0개)
다음 줄들: 각 짐의 무게

【출력】
필요한 가방 수`,
      testCases: [
        { input: "6\n8\n1\n4\n2\n5\n6\n1\n3\n2", output: "4" },
        { input: "10\n0", output: "0" },
      ],
      hints: [
        "순서대로 넣되, 현재 가방에 안 들어가면 새 가방 열기",
        "각 가방의 남은 용량을 추적하세요",
      ],
      starter: `const lines = input.split('\\n');\nconst C = Number(lines[0]);\n\n`,
    },
    {
      id: 1331,
      title: "나이트 투어",
      description: `8×8 체스판에서 나이트가 모든 칸을 정확히 한 번 방문하는지 확인하시오.

【입력】
36개의 좌표 (A1~F6 형식, 6×6 보드)

【출력】
Valid 또는 Invalid`,
      testCases: [
        {
          input: "A1\nB3\nA5\nC6\nE5\nF3\nD2\nF1\nE3\nF5\nD6\nB5\nA3\nB1\nD4\nC2\nA4\nB6\nD5\nF6\nE4\nC3\nA2\nB4\nC6\nD4\nE6\nF4\nD3\nE1\nC2\nA1\nB3\nC1\nE2\nF4",
          output: "Invalid",
        },
      ],
      hints: [
        "나이트의 이동이 유효한지 (가로2세로1 또는 가로1세로2) 매번 확인",
        "모든 36칸을 방문하고, 마지막에서 첫 칸으로 돌아올 수 있는지도 확인",
      ],
      starter: `const lines = input.split('\\n');\n\n`,
    },
    {
      id: 3613,
      title: "Java vs C++",
      description: `변수명이 Java 스타일(camelCase)인지 C++ 스타일(snake_case)인지 판별하고 변환하시오.
Java → C++로, C++ → Java로.
둘 다 해당되거나 둘 다 아니면 "Error!"

【입력】
변수명

【출력】
변환 결과 또는 Error!`,
      testCases: [
        { input: "long_variable_name", output: "longVariableName" },
        { input: "longVariableName", output: "long_variable_name" },
        { input: "aName_inBoth", output: "Error!" },
        { input: "_bad", output: "Error!" },
        { input: "a", output: "a" },
      ],
      hints: [
        "Java: 소문자시작, _없음, 대문자 포함 가능",
        "C++: 소문자와 _ 만, 연속 _ 불가, 시작/끝 _ 불가, 대문자 없음",
      ],
      starter: `const s = input;\n\n`,
    },
    {
      id: 3758,
      title: "KCPC",
      description: `프로그래밍 대회 순위를 매긴다.
순위 기준: 1.총점 내림 → 2.풀이수 내림 → 3.마지막 제출 시간 오름 → 4.팀번호 오름
각 팀의 마지막 제출만 점수로 인정. 특정 팀의 순위를 구하시오.

【입력】
T (테스트케이스 수)
각 케이스 첫 줄: n k p q (팀수, 문제수, 우리팀번호, 제출수)
다음 q줄: 팀번호 문제번호 점수

【출력】
각 케이스: 우리 팀 순위`,
      testCases: [
        {
          input: "1\n3 4 1 10\n1 1 30\n2 1 50\n1 2 40\n2 2 30\n1 3 50\n2 3 40\n3 1 100\n3 2 100\n1 1 20\n2 2 0",
          output: "2",
        },
      ],
      hints: [
        "각 팀별, 각 문제별 마지막 점수를 저장하세요",
        "정렬 조건을 순서대로 적용하세요",
      ],
      starter: `const lines = input.split('\\n');\nconst T = Number(lines[0]);\n\n`,
    },
    {
      id: 1308,
      title: "D-Day",
      description: `두 날짜 사이의 일수 차이를 구하시오.
윤년 규칙: 4의 배수이면 윤년, 100의 배수이면 평년, 400의 배수이면 윤년.
날짜 차이가 1000일 넘으면 "gg".

【입력】
두 줄: Y M D 형식

【출력】
"D-일수" 또는 "gg"`,
      testCases: [
        { input: "2012 9 16\n2012 9 23", output: "D-7" },
        { input: "2012 1 1\n2012 12 31", output: "D-365" },
      ],
      hints: [
        "두 날짜를 일수로 변환하여 차이를 구하세요",
        "JS Date 객체를 활용하면 편합니다",
      ],
      starter: `const lines = input.split('\\n');\n\n`,
    },
    {
      id: 10157,
      title: "자리배정",
      description: `C×R 공연장에서 달팽이 순서로 좌석을 배정한다.
좌하단(1,1)에서 위쪽으로 시작하여 반시계 방향.
K번째 좌석의 좌표를 구하시오.

【입력】
C R
K

【출력】
좌석 좌표 (열 행) 또는 0`,
      testCases: [
        { input: "7 6\n12", output: "2 3" },
        { input: "7 6\n100", output: "0" },
      ],
      hints: [
        "달팽이 이동: 위→오른→아래→왼 방향으로 반복",
        "이동하며 카운트하다가 K번째에서 멈추세요",
      ],
      starter: `const lines = input.split('\\n');\nconst [C, R] = lines[0].split(' ').map(Number);\n\n`,
    },
    {
      id: 2607,
      title: "비슷한 단어",
      description: `첫 번째 단어와 비슷한 단어 수를 구하시오.
비슷한 단어: 문자 하나를 추가/삭제/교체하면 같아지는 단어.
(구성 문자의 차이가 0~1인 경우)

【입력】
N
N줄: 단어들

【출력】
첫 번째 단어와 비슷한 단어 수 (첫 번째 제외)`,
      testCases: [
        { input: "4\nDOG\nDOT\nDO\nDOG", output: "2" },
      ],
      hints: [
        "각 알파벳의 빈도를 세서 비교하세요",
        "길이 차이가 2 이상이면 비슷할 수 없습니다",
      ],
      starter: `const lines = input.split('\\n');\nconst N = Number(lines[0]);\n\n`,
    },
    {
      id: 5212,
      title: "지구 온난화",
      description: `R×C 지도에서 상하좌우 중 3면 이상이 바다(.)인 땅(X)은 잠긴다.
50년 후 지도를 출력하시오. 불필요한 빈 행/열은 제거.

【입력】
R C
R줄: 지도

【출력】
50년 후 지도`,
      testCases: [
        {
          input: "3 3\n...\n.X.\n...",
          output: "...\n...\n...",
        },
      ],
      hints: [
        "각 X칸에 대해 상하좌우 바다 수를 세세요",
        "3면 이상 바다이면 . 로 변환. 원본을 보고 새 배열에 기록",
      ],
      starter: `const lines = input.split('\\n');\nconst [R, C] = lines[0].split(' ').map(Number);\n\n`,
    },
];
