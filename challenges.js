// ===================== 실무 / 토스 / 비동기 챌린지 문제 =====================
const CHALLENGES = [
  // ======================== PRACTICAL CHALLENGES ========================
  {
    id: "practical-01",
    category: "practical",
    title: "API 응답 정규화",
    description: `백엔드에서 유저 목록 API를 배열로 내려줍니다. 매번 .find()를 써야 해서 느리고, 여러 컴포넌트에서 같은 데이터를 쓰다 보니 동기화 문제가 있습니다.

API 응답 배열을 { byId, allIds } 형태로 정규화하고, CRUD 유틸리티를 작성하세요.

【조건】
- 모든 연산은 불변(immutable). 원본 객체를 변경하지 마세요.
- idKey가 다를 수 있습니다 (예: "_id", "userId").
- allIds는 삽입 순서를 유지합니다.
- merge 시 같은 id가 있으면 나중 것이 우선합니다.

【예시】
const { normalize, denormalize, upsert, remove, merge } = solution();
const users = [
  { id: 1, name: "Kim", role: "admin" },
  { id: 2, name: "Lee", role: "user" },
];
const normalized = normalize(users);
// { byId: { 1: {...}, 2: {...} }, allIds: [1, 2] }

normalized.byId[2]; // { id: 2, name: "Lee", role: "user" }
denormalize(normalized); // 원래 배열로 복원

const updated = upsert(normalized, { id: 2, name: "Lee", role: "admin" });
// Lee의 role이 "admin"으로 변경

const removed = remove(normalized, 1);
// byId에서 1 삭제, allIds에서 1 제거`,
    starter: `function solution() {
  return {
    normalize(items, idKey = "id") {},
    denormalize(normalizedData) {},
    upsert(normalizedData, item, idKey = "id") {},
    remove(normalizedData, id) {},
    merge(dataSources) {},
  };
}\n`,
    testCases: [
      {
        test: `const { normalize, denormalize } = solution();
const users = [{id:1,name:"Kim"},{id:2,name:"Lee"},{id:3,name:"Park"}];
const n = normalize(users);
console.log(JSON.stringify(n.allIds));
console.log(n.byId[2].name);
const arr = denormalize(n);
console.log(arr.length);
console.log(arr[0].name);`,
        expected: `[1,2,3]\nLee\n3\nKim`
      },
      {
        test: `const { normalize, upsert, remove } = solution();
const n = normalize([{id:1,name:"A"},{id:2,name:"B"}]);
const u = upsert(n, {id:2,name:"B2"});
console.log(u.byId[2].name);
console.log(n.byId[2].name);
const r = remove(u, 1);
console.log(JSON.stringify(r.allIds));`,
        expected: `B2\nB\n[2]`
      },
      {
        test: `const { normalize, merge } = solution();
const a = normalize([{id:"p1",title:"Hello"}]);
const b = normalize([{id:"c1",text:"Nice"},{id:"p1",title:"Updated"}]);
const m = merge([a, b]);
console.log(JSON.stringify(m.allIds.sort()));
console.log(m.byId["p1"].title);`,
        expected: `["c1","p1"]\nUpdated`
      }
    ],
    hints: [
      "normalize: items.reduce로 byId 객체를 만들고, items.map(i => i[idKey])로 allIds 만들기",
      "denormalize: allIds.map(id => byId[id])로 원래 배열 복원",
      "upsert: 스프레드 연산자로 새 byId 만들기. allIds에 없으면 추가",
      "remove: byId에서 delete 대신 새 객체 만들기. allIds.filter로 제거",
      "merge: dataSources.reduce로 모든 byId를 합치고 allIds는 Set으로 중복 제거"
    ],
    solution: `function solution() {
  return {
    normalize(items, idKey = "id") {
      const byId = {};
      const allIds = [];
      for (const item of items) {
        const id = item[idKey];
        byId[id] = item;
        allIds.push(id);
      }
      return { byId, allIds };
    },
    denormalize(data) {
      return data.allIds.map(id => data.byId[id]);
    },
    upsert(data, item, idKey = "id") {
      const id = item[idKey];
      const byId = { ...data.byId, [id]: item };
      const allIds = data.allIds.includes(id) ? [...data.allIds] : [...data.allIds, id];
      return { byId, allIds };
    },
    remove(data, id) {
      const { [id]: _, ...byId } = data.byId;
      return { byId, allIds: data.allIds.filter(i => i !== id) };
    },
    merge(dataSources) {
      const byId = {};
      const allIds = [];
      const seen = new Set();
      for (const src of dataSources) {
        for (const id of src.allIds) {
          byId[id] = src.byId[id];
          if (!seen.has(id)) { seen.add(id); allIds.push(id); }
        }
      }
      return { byId, allIds };
    }
  };
}`
  },
  {
    id: "practical-02",
    category: "practical",
    title: "장바구니 계산기",
    description: `장바구니에 상품 추가/삭제/수량 변경, 쿠폰 적용(정액/정률), 배송비 정책, 재고 제한을 구현하세요.

【조건】
- add(product, quantity): 이미 있으면 수량 증가. 재고/maxPerOrder 초과 시 에러.
- updateQuantity(productId, quantity): 0이면 삭제. 재고 초과 시 에러.
- applyCoupon(coupon): { type: "fixed", amount } 또는 { type: "percent", amount, maxDiscount }
- getSummary(): { itemCount, subtotal, discount, shipping, total }
- 배송비: 할인 전 금액 5만원 이상 무료, 미만 3,000원
- soldOut 상품 추가 시 에러`,
    starter: `function solution() {
  return {
    createCart() {
      return {
        add(product, quantity = 1) {},
        updateQuantity(productId, quantity) {},
        remove(productId) {},
        applyCoupon(coupon) {},
        getSummary() {},
        getItems() {},
      };
    },
  };
}\n`,
    testCases: [
      {
        test: `const { createCart } = solution();
const cart = createCart();
cart.add({id:"p1",name:"티셔츠",price:29000,stock:10,maxPerOrder:5}, 2);
cart.add({id:"p2",name:"바지",price:45000,stock:3,maxPerOrder:3}, 1);
const s = cart.getSummary();
console.log(s.itemCount);
console.log(s.subtotal);
console.log(s.shipping);
console.log(s.total);`,
        expected: `3\n103000\n0\n103000`
      },
      {
        test: `const { createCart } = solution();
const cart = createCart();
cart.add({id:"p1",name:"A",price:20000,stock:10,maxPerOrder:5}, 2);
cart.applyCoupon({type:"percent",amount:10,maxDiscount:3000});
const s = cart.getSummary();
console.log(s.discount);
console.log(s.shipping);
console.log(s.total);`,
        expected: `3000\n3000\n40000`
      },
      {
        test: `const { createCart } = solution();
const cart = createCart();
cart.add({id:"p1",name:"A",price:10000,stock:10,maxPerOrder:5}, 2);
cart.updateQuantity("p1", 0);
console.log(cart.getItems().length);`,
        expected: `0`
      }
    ],
    hints: [
      "내부에 items Map과 coupon 변수를 관리하세요",
      "add 시 기존 수량 + 새 수량이 maxPerOrder, stock 넘는지 체크",
      "getSummary에서 subtotal 먼저 구하고 할인 적용, 배송비는 할인 전 subtotal 기준",
      "percent 쿠폰: Math.min(subtotal * amount/100, maxDiscount)",
      "total = subtotal - discount + shipping"
    ],
    solution: `function solution() {
  return {
    createCart() {
      const items = new Map();
      let coupon = null;
      return {
        add(product, quantity = 1) {
          if (product.soldOut) throw new Error("품절된 상품입니다");
          const existing = items.get(product.id);
          const cur = existing ? existing.quantity : 0;
          if (cur + quantity > product.maxPerOrder) throw new Error("1인당 최대 " + product.maxPerOrder + "개까지 주문 가능합니다");
          if (cur + quantity > product.stock) throw new Error("재고가 부족합니다");
          items.set(product.id, { product, quantity: cur + quantity });
        },
        updateQuantity(pid, qty) {
          if (qty === 0) { items.delete(pid); return; }
          const item = items.get(pid);
          if (!item) return;
          if (qty > item.product.stock) throw new Error("재고 초과");
          if (qty > item.product.maxPerOrder) throw new Error("주문 수량 초과");
          item.quantity = qty;
        },
        remove(pid) { items.delete(pid); },
        applyCoupon(c) { coupon = c; },
        getSummary() {
          let itemCount = 0, subtotal = 0;
          items.forEach(i => { itemCount += i.quantity; subtotal += i.product.price * i.quantity; });
          let discount = 0;
          if (coupon) {
            if (coupon.type === "fixed") discount = Math.min(coupon.amount, subtotal);
            else discount = Math.min(subtotal * coupon.amount / 100, coupon.maxDiscount || Infinity);
          }
          const shipping = subtotal >= 50000 ? 0 : (subtotal > 0 ? 3000 : 0);
          return { itemCount, subtotal, discount, shipping, total: subtotal - discount + shipping };
        },
        getItems() {
          return [...items.values()].map(i => ({ product: i.product, quantity: i.quantity, subtotal: i.product.price * i.quantity }));
        }
      };
    }
  };
}`
  },
  {
    id: "practical-03",
    category: "practical",
    title: "테이블 필터/정렬/페이지네이션",
    description: `클라이언트 사이드 테이블 데이터 처리: 필터링(eq, ne, gt, gte, lt, lte, contains, startsWith, in, between), 다중 정렬, 텍스트 검색(OR), 페이지네이션을 구현하세요.

【조건】
- filter(field, operator, value): 여러 필터 AND 조합
- sort(field, direction): 다중 정렬 (먼저 호출한 것 우선)
- search(query, fields): 여러 필드 중 하나라도 포함이면 매치 (OR)
- paginate(page, perPage): { data, total, totalPages, page }
- execute(): 최종 결과 반환. 실행 순서: filter → search → sort → paginate
- reset(): 조건 초기화
- 체이닝 지원: query.filter(...).sort(...).paginate(...).execute()`,
    starter: `function solution(data) {
  return {
    filter(field, operator, value) {},
    sort(field, direction) {},
    search(query, fields) {},
    paginate(page, perPage) {},
    execute() {},
    reset() {},
  };
}\n`,
    testCases: [
      {
        test: `const data = [
  {id:1,name:"Kim",age:30,score:85},
  {id:2,name:"Lee",age:25,score:92},
  {id:3,name:"Park",age:35,score:78},
  {id:4,name:"Choi",age:28,score:95},
];
const q = solution(data);
const r = q.filter("age","gte",28).sort("score","desc").execute();
console.log(r.map(x=>x.name).join(","));`,
        expected: `Choi,Kim,Park`
      },
      {
        test: `const data = [
  {id:1,name:"Kim",age:30},
  {id:2,name:"Lee",age:25},
  {id:3,name:"Park",age:35},
  {id:4,name:"Choi",age:28},
  {id:5,name:"Jung",age:22},
];
const q = solution(data);
const r = q.sort("age","asc").paginate(1,2).execute();
console.log(r.data.map(x=>x.name).join(","));
console.log(r.total);
console.log(r.totalPages);`,
        expected: `Jung,Lee\n5\n3`
      },
      {
        test: `const data = [
  {id:1,name:"Alice",city:"Seoul"},
  {id:2,name:"Bob",city:"Busan"},
  {id:3,name:"Charlie",city:"Seoul"},
];
const q = solution(data);
const r = q.search("se",["name","city"]).execute();
console.log(r.length);`,
        expected: `2`
      }
    ],
    hints: [
      "내부에 filters, sorts, searchQuery, pagination 상태를 배열/객체로 관리",
      "각 메서드는 상태를 추가하고 this를 리턴 (체이닝)",
      "execute에서 순서대로 적용: filter → search → sort → paginate",
      "filter 연산자별 비교 함수를 객체로 매핑해두면 깔끔",
      "paginate: slice((page-1)*perPage, page*perPage), totalPages = Math.ceil(total/perPage)"
    ],
    solution: `function solution(data) {
  let filters = [], sorts = [], searchQ = null, searchFields = [], pag = null;
  const ops = {
    eq:(a,b)=>a===b, ne:(a,b)=>a!==b, gt:(a,b)=>a>b, gte:(a,b)=>a>=b,
    lt:(a,b)=>a<b, lte:(a,b)=>a<=b,
    contains:(a,b)=>String(a).includes(b), startsWith:(a,b)=>String(a).startsWith(b),
    in:(a,b)=>b.includes(a), between:(a,b)=>a>=b[0]&&a<=b[1]
  };
  const api = {
    filter(f,o,v) { filters.push({f,o,v}); return api; },
    sort(f,d) { sorts.push({f,d}); return api; },
    search(q,fields) { searchQ=q.toLowerCase(); searchFields=fields; return api; },
    paginate(p,pp) { pag={p,pp}; return api; },
    reset() { filters=[]; sorts=[]; searchQ=null; pag=null; return api; },
    execute() {
      let r = [...data];
      for (const {f,o,v} of filters) r = r.filter(item => ops[o](item[f], v));
      if (searchQ) r = r.filter(item => searchFields.some(f => String(item[f]).toLowerCase().includes(searchQ)));
      for (const {f,d} of [...sorts].reverse()) r.sort((a,b) => { const c = a[f]<b[f]?-1:a[f]>b[f]?1:0; return d==="desc"?-c:c; });
      if (pag) { const {p,pp}=pag; const total=r.length; return {data:r.slice((p-1)*pp,p*pp),total,totalPages:Math.ceil(total/pp),page:p}; }
      return r;
    }
  };
  return api;
}`
  },
  {
    id: "practical-04",
    category: "practical",
    title: "URL <-> 상태 동기화",
    description: `URL 쿼리 스트링과 상태 객체 간 양방향 변환을 구현하세요.

【조건】
- 스키마 기반 타입 변환: string, number, boolean, array
- 스키마에 없는 파라미터는 무시
- 기본값과 같으면 stringify에서 생략
- array는 콤마 구분 (a,b,c)
- encodeURIComponent/decodeURIComponent 적용

schema 형태:
{ page: { type: "number", default: 1 },
  q: { type: "string", default: "" },
  active: { type: "boolean", default: true },
  tags: { type: "array", default: [] } }`,
    starter: `function solution(schema) {
  return {
    parse(queryString) {},
    stringify(state) {},
    update(currentState, partial) {},
  };
}\n`,
    testCases: [
      {
        test: `const s = solution({
  page:{type:"number",default:1},
  q:{type:"string",default:""},
  active:{type:"boolean",default:true}
});
const r = s.parse("?page=3&q=hello&active=false");
console.log(r.page);
console.log(typeof r.page);
console.log(r.q);
console.log(r.active);`,
        expected: `3\nnumber\nhello\nfalse`
      },
      {
        test: `const s = solution({
  page:{type:"number",default:1},
  q:{type:"string",default:""},
});
const qs = s.stringify({page:1,q:"test"});
console.log(qs);`,
        expected: `q=test`
      },
      {
        test: `const s = solution({
  tags:{type:"array",default:[]},
  page:{type:"number",default:1}
});
const r = s.parse("?tags=a,b,c&page=2");
console.log(JSON.stringify(r.tags));
console.log(r.page);`,
        expected: `["a","b","c"]\n2`
      }
    ],
    hints: [
      "parse: URLSearchParams로 파싱 후 스키마 기준으로 타입 변환",
      "number: Number(val), boolean: val === 'true', array: val.split(',')",
      "stringify: 기본값과 다른 것만 key=value로 join('&')",
      "update: {...currentState, ...partial}로 머지 후 stringify",
      "스키마에 없는 키는 parse/stringify 모두 무시"
    ],
    solution: `function solution(schema) {
  function convert(val, type) {
    if (type === "number") return Number(val);
    if (type === "boolean") return val === "true";
    if (type === "array") return val ? val.split(",").map(decodeURIComponent) : [];
    return decodeURIComponent(val);
  }
  return {
    parse(qs) {
      const params = new URLSearchParams(qs);
      const state = {};
      for (const [key, def] of Object.entries(schema)) {
        state[key] = params.has(key) ? convert(params.get(key), def.type) : def.default;
      }
      return state;
    },
    stringify(state) {
      const parts = [];
      for (const [key, def] of Object.entries(schema)) {
        const val = state[key];
        if (JSON.stringify(val) === JSON.stringify(def.default)) continue;
        const encoded = def.type === "array" ? val.map(encodeURIComponent).join(",") : encodeURIComponent(val);
        parts.push(key + "=" + encoded);
      }
      return parts.join("&");
    },
    update(cur, partial) {
      return { ...cur, ...partial };
    }
  };
}`
  },
  {
    id: "practical-05",
    category: "practical",
    title: "무한 스크롤 데이터 머지",
    description: `무한 스크롤 피드 데이터를 관리합니다.

【조건】
- appendPage(items): 페이지 데이터 추가, 중복 id 제거
- prepend(items): 실시간 새 항목을 맨 앞에 추가, 기존 항목이면 위치만 이동
- updateItem(id, changes): 항목 업데이트
- removeItem(id): 항목 삭제
- has(id): O(1) 존재 확인
- getItems(): 전체 목록 반환
- count(): 항목 수`,
    starter: `function solution(idKey = "id") {
  return {
    getItems() {},
    appendPage(items) {},
    prepend(items) {},
    updateItem(id, changes) {},
    removeItem(id) {},
    has(id) {},
    count() {},
    reset() {},
  };
}\n`,
    testCases: [
      {
        test: `const feed = solution("id");
feed.appendPage([{id:1,text:"a"},{id:2,text:"b"}]);
feed.appendPage([{id:2,text:"b"},{id:3,text:"c"}]);
console.log(feed.count());
console.log(feed.getItems().map(x=>x.id).join(","));`,
        expected: `3\n1,2,3`
      },
      {
        test: `const feed = solution("id");
feed.appendPage([{id:1,text:"a"},{id:2,text:"b"}]);
feed.prepend([{id:3,text:"new"},{id:1,text:"a"}]);
console.log(feed.getItems().map(x=>x.id).join(","));
console.log(feed.has(3));
console.log(feed.has(99));`,
        expected: `3,1,2\ntrue\nfalse`
      },
      {
        test: `const feed = solution("id");
feed.appendPage([{id:1,text:"a",likes:0}]);
feed.updateItem(1, {likes:5});
console.log(feed.getItems()[0].likes);
feed.removeItem(1);
console.log(feed.count());`,
        expected: `5\n0`
      }
    ],
    hints: [
      "내부에 배열(순서)과 Map/Set(빠른 조회)을 동시에 관리",
      "appendPage: 이미 있는 id는 skip, 새 것만 push",
      "prepend: 기존에 있으면 제거 후 앞에 추가 (unshift)",
      "has는 Set으로 O(1) 확인",
      "updateItem: Map에서 찾아서 스프레드로 업데이트"
    ],
    solution: `function solution(idKey = "id") {
  let items = [];
  const idSet = new Set();
  const idMap = new Map();
  return {
    getItems() { return [...items]; },
    appendPage(newItems) {
      for (const item of newItems) {
        const id = item[idKey];
        if (!idSet.has(id)) { items.push(item); idSet.add(id); idMap.set(id, item); }
      }
    },
    prepend(newItems) {
      const toAdd = [];
      for (const item of newItems) {
        const id = item[idKey];
        if (idSet.has(id)) items = items.filter(i => i[idKey] !== id);
        else idSet.add(id);
        idMap.set(id, item);
        toAdd.push(item);
      }
      items = [...toAdd, ...items];
    },
    updateItem(id, changes) {
      const idx = items.findIndex(i => i[idKey] === id);
      if (idx >= 0) { items[idx] = { ...items[idx], ...changes }; idMap.set(id, items[idx]); }
    },
    removeItem(id) {
      items = items.filter(i => i[idKey] !== id);
      idSet.delete(id); idMap.delete(id);
    },
    has(id) { return idSet.has(id); },
    count() { return items.length; },
    reset() { items = []; idSet.clear(); idMap.clear(); }
  };
}`
  },
  {
    id: "practical-06",
    category: "practical",
    title: "권한 체크 시스템 (RBAC)",
    description: `역할(Role) 기반 + 리소스/액션 권한 체크 시스템을 구현하세요.

【조건】
- defineRole(name, permissions): 권한 정의. 예: defineRole("viewer", ["post:read", "comment:read"])
- extendRole(name, parentRole, extra): 상속. 부모 권한 + 추가 권한
- assignRole(userId, role): 유저에 역할 부여 (다중 역할 가능)
- can(userId, action): 권한 확인. 와일드카드 지원 ("post:*" → post:read, post:write 등)
- getPermissions(userId): 유저의 모든 권한 Set
- getAllowedActions(userId, resource): 특정 리소스에 대한 허용 액션 목록`,
    starter: `function solution() {
  return {
    defineRole(name, permissions) {},
    extendRole(name, parentRole, extra) {},
    assignRole(userId, role) {},
    can(userId, action) {},
    getPermissions(userId) {},
    getAllowedActions(userId, resource) {},
  };
}\n`,
    testCases: [
      {
        test: `const rbac = solution();
rbac.defineRole("viewer", ["post:read", "comment:read"]);
rbac.defineRole("editor", ["post:read", "post:write", "comment:read", "comment:write"]);
rbac.assignRole("u1", "viewer");
rbac.assignRole("u2", "editor");
console.log(rbac.can("u1", "post:read"));
console.log(rbac.can("u1", "post:write"));
console.log(rbac.can("u2", "post:write"));`,
        expected: `true\nfalse\ntrue`
      },
      {
        test: `const rbac = solution();
rbac.defineRole("viewer", ["post:read"]);
rbac.extendRole("admin", "viewer", ["post:*", "user:*"]);
rbac.assignRole("u1", "admin");
console.log(rbac.can("u1", "post:read"));
console.log(rbac.can("u1", "post:delete"));
console.log(rbac.can("u1", "user:ban"));`,
        expected: `true\ntrue\ntrue`
      },
      {
        test: `const rbac = solution();
rbac.defineRole("a", ["x:read"]);
rbac.defineRole("b", ["y:write"]);
rbac.assignRole("u1", "a");
rbac.assignRole("u1", "b");
const perms = rbac.getPermissions("u1");
console.log(perms.has("x:read"));
console.log(perms.has("y:write"));
console.log(perms.size);`,
        expected: `true\ntrue\n2`
      }
    ],
    hints: [
      "roles를 Map<name, Set<permission>>으로 관리",
      "extendRole: 부모 권한을 복사 후 추가 권한 합치기",
      "assignRole: userRoles Map에 역할 Set 관리",
      "can: 유저의 모든 역할 권한을 모아서 와일드카드 매칭 체크",
      "와일드카드: 'post:*'는 action.startsWith('post:')로 매칭"
    ],
    solution: `function solution() {
  const roles = new Map();
  const userRoles = new Map();
  function getRolePerms(name) {
    return roles.get(name) || new Set();
  }
  function getAllPerms(userId) {
    const ur = userRoles.get(userId) || new Set();
    const perms = new Set();
    ur.forEach(r => getRolePerms(r).forEach(p => perms.add(p)));
    return perms;
  }
  function matches(perm, action) {
    if (perm === action) return true;
    if (perm.endsWith(":*")) return action.startsWith(perm.slice(0, -1));
    return false;
  }
  return {
    defineRole(name, perms) { roles.set(name, new Set(perms)); },
    extendRole(name, parent, extra) {
      const ps = new Set(getRolePerms(parent));
      (extra || []).forEach(p => ps.add(p));
      roles.set(name, ps);
    },
    assignRole(uid, role) {
      if (!userRoles.has(uid)) userRoles.set(uid, new Set());
      userRoles.get(uid).add(role);
    },
    can(uid, action) {
      const perms = getAllPerms(uid);
      for (const p of perms) if (matches(p, action)) return true;
      return false;
    },
    getPermissions(uid) { return getAllPerms(uid); },
    getAllowedActions(uid, resource) {
      const perms = getAllPerms(uid);
      const actions = new Set();
      perms.forEach(p => {
        const [res, act] = p.split(":");
        if (res === resource) actions.add(act);
      });
      return [...actions];
    }
  };
}`
  },
  {
    id: "practical-07",
    category: "practical",
    title: "다단계 폼 상태 관리",
    description: `다단계 폼(예: 회원가입)의 상태를 관리합니다.

【조건】
- steps 배열: [{ id, validate(data), skip?(allData) }]
- getCurrentStep(): 현재 스텝 정보
- setData(data): 현재 스텝에 데이터 설정
- next(): 다음 스텝으로. validate 실패 시 에러. skip 조건인 스텝은 건너뜀
- prev(): 이전 스텝으로 (데이터 유지)
- getAllData(): 모든 스텝 데이터 합친 객체
- getProgress(): { current, total, percent }
- canSubmit(): 모든 스텝 유효한지
- submit(): 최종 제출 (전체 데이터 반환)`,
    starter: `function solution(steps) {
  return {
    getCurrentStep() {},
    setData(data) {},
    next() {},
    prev() {},
    goTo(stepId) {},
    getAllData() {},
    getProgress() {},
    canSubmit() {},
    submit() {},
  };
}\n`,
    testCases: [
      {
        test: `const form = solution([
  {id:"basic", validate: d => d.name && d.name.length > 0},
  {id:"detail", validate: d => d.age > 0},
  {id:"agree", validate: d => d.agreed === true},
]);
console.log(form.getCurrentStep().id);
form.setData({name:"Kim"});
form.next();
console.log(form.getCurrentStep().id);
form.setData({age:25});
form.next();
console.log(form.getCurrentStep().id);`,
        expected: `basic\ndetail\nagree`
      },
      {
        test: `const form = solution([
  {id:"type", validate: d => !!d.userType},
  {id:"company", validate: d => !!d.company, skip: all => all.type?.userType === "personal"},
  {id:"agree", validate: d => d.agreed === true},
]);
form.setData({userType:"personal"});
form.next();
console.log(form.getCurrentStep().id);`,
        expected: `agree`
      },
      {
        test: `const form = solution([
  {id:"a", validate: d => !!d.x},
  {id:"b", validate: d => !!d.y},
]);
form.setData({x:1});
form.next();
form.setData({y:2});
const all = form.getAllData();
console.log(all.x);
console.log(all.y);
form.prev();
console.log(form.getCurrentStep().id);`,
        expected: `1\n2\na`
      }
    ],
    hints: [
      "각 스텝별 data를 Map으로 관리하고 currentIndex로 위치 추적",
      "next(): validate 후 다음 인덱스로. skip 조건 체크하면서 건너뛰기",
      "prev(): 이전 인덱스로. skip인 스텝도 건너뛰기",
      "getAllData(): 모든 스텝 데이터를 Object.assign으로 합치기",
      "getProgress에서 skip되는 스텝은 total에서 빼기"
    ],
    solution: `function solution(steps) {
  let idx = 0;
  const dataMap = {};
  steps.forEach(s => dataMap[s.id] = {});
  function nextValid(i, dir) {
    i += dir;
    while (i >= 0 && i < steps.length) {
      const all = getAllData();
      if (!steps[i].skip || !steps[i].skip(all)) return i;
      i += dir;
    }
    return dir > 0 ? i : 0;
  }
  function getAllData() {
    return Object.values(dataMap).reduce((a, d) => ({...a, ...d}), {});
  }
  return {
    getCurrentStep() { return steps[idx]; },
    setData(d) { dataMap[steps[idx].id] = {...dataMap[steps[idx].id], ...d}; },
    next() {
      const v = steps[idx].validate(dataMap[steps[idx].id]);
      if (!v) throw new Error("Validation failed");
      const ni = nextValid(idx, 1);
      if (ni < steps.length) idx = ni;
    },
    prev() { const ni = nextValid(idx, -1); if (ni >= 0) idx = ni; },
    goTo(id) { const i = steps.findIndex(s => s.id === id); if (i >= 0) idx = i; },
    getAllData,
    getProgress() {
      const all = getAllData();
      const active = steps.filter(s => !s.skip || !s.skip(all));
      const cur = active.indexOf(steps[idx]) + 1;
      return { current: cur, total: active.length, percent: Math.round(cur / active.length * 100) };
    },
    canSubmit() { return steps.every(s => { const all = getAllData(); if (s.skip && s.skip(all)) return true; return s.validate(dataMap[s.id]); }); },
    submit() { if (!this.canSubmit()) throw new Error("Not ready"); return getAllData(); }
  };
}`
  },
  {
    id: "practical-08",
    category: "practical",
    title: "CSV 내보내기",
    description: `객체 배열을 RFC 4180 준수 CSV 문자열로 변환합니다.

【조건】
- 기본: 객체 키를 헤더로, 값을 행으로
- 쉼표/따옴표/줄바꿈 포함 값은 따옴표로 감싸기
- 따옴표 안의 따옴표는 "" 이스케이프
- BOM(\\uFEFF) 추가 옵션 (Excel 한글 지원)
- columns 옵션: [{ key, header, formatter }]
- 중첩 객체 dot notation 접근: "address.city"`,
    starter: `function solution(data, options = {}) {
  // options: { columns, bom, delimiter }
  // return CSV string
}\n`,
    testCases: [
      {
        test: `const csv = solution([
  {name:"Kim",age:30},
  {name:"Lee",age:25},
]);
console.log(csv);`,
        expected: `name,age\nKim,30\nLee,25`
      },
      {
        test: `const csv = solution([
  {name:'He said "hi"',city:"Seoul, Korea"},
], {});
const lines = csv.split("\\n");
console.log(lines[1]);`,
        expected: `"He said ""hi""","Seoul, Korea"`
      },
      {
        test: `const csv = solution([
  {name:"Kim",address:{city:"Seoul"}},
], {columns:[
  {key:"name",header:"이름"},
  {key:"address.city",header:"도시"},
]});
const lines = csv.split("\\n");
console.log(lines[0]);
console.log(lines[1]);`,
        expected: `이름,도시\nKim,Seoul`
      }
    ],
    hints: [
      "기본 columns는 Object.keys(data[0]).map(k => ({key:k, header:k}))",
      "dot notation: key.split('.').reduce((o,k) => o?.[k], obj)로 중첩 접근",
      "값에 쉼표, 따옴표, 줄바꿈이 있으면 따옴표로 감싸기",
      "따옴표 이스케이프: val.replace(/\"/g, '\"\"')",
      "BOM 옵션이면 앞에 \\uFEFF 추가"
    ],
    solution: `function solution(data, options = {}) {
  const { columns, bom, delimiter = "," } = options;
  const cols = columns || Object.keys(data[0] || {}).map(k => ({key:k, header:k}));
  function getVal(obj, path) { return path.split(".").reduce((o,k) => o?.[k], obj); }
  function escape(val) {
    const s = val == null ? "" : String(val);
    if (s.includes(delimiter) || s.includes('"') || s.includes("\\n")) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }
  const header = cols.map(c => escape(c.header)).join(delimiter);
  const rows = data.map(row => cols.map(c => {
    let val = getVal(row, c.key);
    if (c.formatter) val = c.formatter(val);
    return escape(val);
  }).join(delimiter));
  const csv = [header, ...rows].join("\\n");
  return bom ? "\\uFEFF" + csv : csv;
}`
  },
  {
    id: "practical-09",
    category: "practical",
    title: "날짜 범위 계산기",
    description: `날짜 범위 관련 유틸리티를 구현하세요. (순수 JS, 라이브러리 없이)

【조건】
- preset(name): 프리셋 반환 (today, yesterday, last7days, thisWeek, lastWeek, thisMonth, lastMonth 등)
- range(start, end): 커스텀 범위
- compareTo(range, type): 비교 기간 계산 (previous, lastYear)
- split(range, unit): 범위를 day/week/month 단위로 쪼개기
- overlaps(range1, range2): 두 범위 겹침 여부
- businessDays(range): 영업일 수 (월~금)
- 주 시작은 월요일`,
    starter: `function solution(now) {
  return {
    preset(name) {},
    range(start, end) {},
    compareTo(range, type) {},
    split(range, unit) {},
    overlaps(range1, range2) {},
    businessDays(range) {},
  };
}\n`,
    testCases: [
      {
        test: `const d = solution(new Date("2024-03-15T12:00:00"));
const today = d.preset("today");
console.log(today.start.toISOString().slice(0,10));
console.log(today.end.toISOString().slice(0,10));`,
        expected: `2024-03-15\n2024-03-15`
      },
      {
        test: `const d = solution(new Date("2024-03-15T12:00:00"));
const r1 = {start:new Date("2024-03-01"),end:new Date("2024-03-10")};
const r2 = {start:new Date("2024-03-08"),end:new Date("2024-03-20")};
const r3 = {start:new Date("2024-03-11"),end:new Date("2024-03-20")};
console.log(d.overlaps(r1,r2));
console.log(d.overlaps(r1,r3));`,
        expected: `true\nfalse`
      },
      {
        test: `const d = solution(new Date("2024-03-15"));
const r = {start:new Date("2024-03-11"),end:new Date("2024-03-15")};
console.log(d.businessDays(r));`,
        expected: `5`
      }
    ],
    hints: [
      "Date 조작: new Date(date)로 복사 후 setHours(0,0,0,0)으로 시간 초기화",
      "preset: switch문으로 각 프리셋별 start/end 계산",
      "thisWeek: getDay()로 월요일까지 뒤로, 일요일까지 앞으로",
      "overlaps: start1 <= end2 && start2 <= end1",
      "businessDays: 날짜 순회하며 getDay()가 1~5인 것만 카운트"
    ],
    solution: `function solution(now) {
  function d(date) { const r = new Date(date); r.setHours(0,0,0,0); return r; }
  function addDays(date, n) { const r = d(date); r.setDate(r.getDate() + n); return r; }
  return {
    preset(name) {
      const today = d(now);
      if (name === "today") return {start:today, end:today};
      if (name === "yesterday") return {start:addDays(today,-1), end:addDays(today,-1)};
      if (name === "last7days") return {start:addDays(today,-6), end:today};
      if (name === "thisWeek") { const day = today.getDay()||7; return {start:addDays(today,1-day), end:addDays(today,7-day)}; }
      if (name === "thisMonth") { const s = d(today); s.setDate(1); const e = d(today); e.setMonth(e.getMonth()+1); e.setDate(0); return {start:s,end:e}; }
      return {start:today,end:today};
    },
    range(s,e) { return {start:d(s),end:d(e)}; },
    compareTo(range, type) {
      const len = (range.end - range.start) / 86400000 + 1;
      if (type === "previous") return {start:addDays(range.start,-len),end:addDays(range.start,-1)};
      return {start:addDays(range.start,-365),end:addDays(range.end,-365)};
    },
    split(range, unit) {
      const result = []; let cur = d(range.start);
      while (cur <= range.end) {
        let end;
        if (unit === "day") end = d(cur);
        else if (unit === "week") { end = addDays(cur, 6); if (end > range.end) end = d(range.end); }
        else { end = d(cur); end.setMonth(end.getMonth()+1); end.setDate(0); if (end > range.end) end = d(range.end); }
        result.push({start:d(cur), end});
        cur = addDays(end, 1);
      }
      return result;
    },
    overlaps(r1,r2) { return d(r1.start) <= d(r2.end) && d(r2.start) <= d(r1.end); },
    businessDays(range) {
      let count = 0, cur = d(range.start);
      while (cur <= d(range.end)) { const day = cur.getDay(); if (day >= 1 && day <= 5) count++; cur = addDays(cur, 1); }
      return count;
    }
  };
}`
  },
  {
    id: "practical-10",
    category: "practical",
    title: "드래그 앤 드롭 순서 변경",
    description: `칸반 보드 데이터 로직을 구현하세요.

【조건】
- reorder(listId, fromIndex, toIndex): 같은 리스트 내 순서 변경
- move(fromListId, fromIndex, toListId, toIndex): 다른 리스트로 이동
- moveMultiple(fromListId, indices, toListId, toIndex): 다중 선택 이동
- undo() / redo(): 실행 취소 / 다시 실행
- getChanges(): 서버 동기화용 변경 내역 diff
- 모든 연산은 불변`,
    starter: `function solution(initialData) {
  // initialData: { [listId]: [item, ...] }
  return {
    reorder(listId, fromIndex, toIndex) {},
    move(fromListId, fromIndex, toListId, toIndex) {},
    moveMultiple(fromListId, indices, toListId, toIndex) {},
    getState() {},
    undo() {},
    redo() {},
    getChanges() {},
  };
}\n`,
    testCases: [
      {
        test: `const board = solution({todo:["a","b","c"],doing:[],done:[]});
board.reorder("todo", 0, 2);
console.log(board.getState().todo.join(","));`,
        expected: `b,c,a`
      },
      {
        test: `const board = solution({todo:["a","b","c"],doing:[]});
board.move("todo", 0, "doing", 0);
console.log(board.getState().todo.join(","));
console.log(board.getState().doing.join(","));
board.undo();
console.log(board.getState().todo.join(","));
console.log(board.getState().doing.join(","));`,
        expected: `b,c\na\na,b,c\n`
      },
      {
        test: `const board = solution({todo:["a","b","c","d"],doing:[]});
board.moveMultiple("todo", [0,2], "doing", 0);
console.log(board.getState().todo.join(","));
console.log(board.getState().doing.join(","));`,
        expected: `b,d\na,c`
      }
    ],
    hints: [
      "상태를 스냅샷 배열로 관리해 undo/redo 구현",
      "reorder: splice로 빼고 splice로 넣기 (불변이니 배열 복사 후)",
      "move: from 리스트에서 splice 제거, to 리스트에 splice 삽입",
      "undo: history 인덱스를 뒤로, redo: 앞으로",
      "getChanges: 초기 상태와 현재 상태를 비교해서 diff 계산"
    ],
    solution: `function solution(initialData) {
  const history = [JSON.parse(JSON.stringify(initialData))];
  let idx = 0;
  function cur() { return JSON.parse(JSON.stringify(history[idx])); }
  function push(state) { history.splice(idx + 1); history.push(state); idx++; }
  return {
    reorder(lid, fi, ti) {
      const s = cur(); const item = s[lid].splice(fi, 1)[0]; s[lid].splice(ti, 0, item); push(s);
    },
    move(fl, fi, tl, ti) {
      const s = cur(); const item = s[fl].splice(fi, 1)[0]; s[tl].splice(ti, 0, item); push(s);
    },
    moveMultiple(fl, indices, tl, ti) {
      const s = cur();
      const sorted = [...indices].sort((a,b)=>b-a);
      const items = sorted.map(i => s[fl].splice(i, 1)[0]).reverse();
      s[tl].splice(ti, 0, ...items); push(s);
    },
    getState() { return cur(); },
    undo() { if (idx > 0) idx--; },
    redo() { if (idx < history.length - 1) idx++; },
    getChanges() { return { before: history[0], after: history[idx] }; }
  };
}`
  },
  {
    id: "practical-11",
    category: "practical",
    title: "트리 구조 메뉴 처리",
    description: `플랫 배열(parentId 연결)을 트리 구조로 변환하고, 트리 관련 연산을 구현하세요.

【조건】
- toTree(flatArray): 플랫 → 중첩 트리 변환
- toFlat(tree): 트리 → 플랫 배열 변환
- findPath(tree, id): 루트부터 해당 id까지 경로 (breadcrumb)
- search(tree, query): 텍스트 검색 (매치 + 조상 노드 포함)
- getDescendantIds(tree, id): 모든 하위 노드 id 목록
- addNode / removeNode / moveNode`,
    starter: `function solution() {
  return {
    toTree(flat) {},
    toFlat(tree) {},
    findPath(tree, id) {},
    search(tree, query) {},
    getDescendantIds(tree, id) {},
    addNode(tree, parentId, node) {},
    removeNode(tree, id) {},
    moveNode(tree, id, newParentId) {},
  };
}\n`,
    testCases: [
      {
        test: `const t = solution();
const flat = [
  {id:1,name:"Root",parentId:null},
  {id:2,name:"Child1",parentId:1},
  {id:3,name:"Child2",parentId:1},
  {id:4,name:"Grandchild",parentId:2},
];
const tree = t.toTree(flat);
console.log(tree.length);
console.log(tree[0].children.length);
console.log(tree[0].children[0].children[0].name);`,
        expected: `1\n2\nGrandchild`
      },
      {
        test: `const t = solution();
const flat = [
  {id:1,name:"Root",parentId:null},
  {id:2,name:"A",parentId:1},
  {id:3,name:"B",parentId:1},
  {id:4,name:"C",parentId:2},
];
const tree = t.toTree(flat);
const path = t.findPath(tree, 4);
console.log(path.map(n=>n.name).join(" > "));`,
        expected: `Root > A > C`
      },
      {
        test: `const t = solution();
const flat = [
  {id:1,name:"Root",parentId:null},
  {id:2,name:"React",parentId:1},
  {id:3,name:"Vue",parentId:1},
  {id:4,name:"Redux",parentId:2},
];
const tree = t.toTree(flat);
const ids = t.getDescendantIds(tree, 1);
console.log(ids.sort().join(","));`,
        expected: `2,3,4`
      }
    ],
    hints: [
      "toTree: Map으로 id→node 매핑. parentId가 null이면 루트",
      "각 노드에 children 배열 추가, parentId로 부모의 children에 push",
      "findPath: DFS로 탐색하며 경로 배열 유지",
      "search: DFS로 매치 찾고, 조상까지 포함해 트리 재구성",
      "getDescendantIds: BFS/DFS로 자식 노드 id 수집"
    ],
    solution: `function solution() {
  function clone(tree) { return JSON.parse(JSON.stringify(tree)); }
  return {
    toTree(flat) {
      const map = new Map(); const roots = [];
      flat.forEach(n => map.set(n.id, {...n, children: []}));
      flat.forEach(n => { const node = map.get(n.id); if (n.parentId == null) roots.push(node); else map.get(n.parentId)?.children.push(node); });
      return roots;
    },
    toFlat(tree) {
      const result = [];
      function walk(nodes, parentId) { nodes.forEach(n => { result.push({id:n.id,name:n.name,parentId}); if(n.children) walk(n.children, n.id); }); }
      walk(tree, null); return result;
    },
    findPath(tree, id) {
      function dfs(nodes, path) { for (const n of nodes) { const p = [...path, {id:n.id,name:n.name}]; if (n.id===id) return p; if (n.children) { const r = dfs(n.children, p); if (r) return r; } } return null; }
      return dfs(tree, []);
    },
    search(tree, query) {
      const q = query.toLowerCase();
      function filter(nodes) { return nodes.reduce((acc, n) => { const match = n.name.toLowerCase().includes(q); const children = n.children ? filter(n.children) : [];
        if (match || children.length) acc.push({...n, children}); return acc; }, []); }
      return filter(tree);
    },
    getDescendantIds(tree, id) {
      function findNode(nodes) { for (const n of nodes) { if (n.id===id) return n; if (n.children) { const r = findNode(n.children); if(r) return r; } } return null; }
      const node = findNode(tree); if (!node) return [];
      const ids = [];
      function collect(nodes) { nodes.forEach(n => { ids.push(n.id); if(n.children) collect(n.children); }); }
      if (node.children) collect(node.children); return ids;
    },
    addNode(tree, parentId, node) {
      const t = clone(tree);
      function find(nodes) { for (const n of nodes) { if(n.id===parentId){n.children.push({...node,children:[]});return true;} if(n.children&&find(n.children))return true; } return false; }
      find(t); return t;
    },
    removeNode(tree, id) {
      const t = clone(tree);
      function rm(nodes) { return nodes.filter(n => { if(n.id===id) return false; if(n.children) n.children = rm(n.children); return true; }); }
      return rm(t);
    },
    moveNode(tree, id, newParentId) { const flat = this.toFlat(tree); const node = flat.find(n=>n.id===id); if(node) node.parentId=newParentId; return this.toTree(flat); }
  };
}`
  },
  {
    id: "practical-12",
    category: "practical",
    title: "API 에러 핸들링 레이어",
    description: `공통 API 래퍼를 만들어 에러를 처리합니다.

【조건】
- 401: 토큰 갱신(onTokenRefresh) 후 재시도. 동시 401 여러 개면 갱신 1번만
- 403: onError("permission_denied") 호출
- 429: 재시도 (Retry-After 헤더 활용)
- 500: onError("server_error") 호출
- 네트워크 에러: onOffline() 호출
- request/response 인터셉터 지원`,
    starter: `function solution({ onError, onTokenRefresh, onOffline }) {
  return {
    request(config) {},
    addRequestInterceptor(fn) {},
    addResponseInterceptor(fn) {},
  };
}\n`,
    testCases: [
      {
        test: `let refreshCount = 0;
const api = solution({
  onError: (type) => {},
  onTokenRefresh: async () => { refreshCount++; return "newToken"; },
  onOffline: () => {},
});
// Simulate normal request
const result = await api.request({
  url: "/test",
  fetch: async () => ({ status: 200, data: "ok" })
});
console.log(result.data);`,
        expected: `ok`,
        async: true
      },
      {
        test: `let refreshCount = 0;
let retryCount = 0;
const api = solution({
  onError: () => {},
  onTokenRefresh: async () => { refreshCount++; return "newToken"; },
  onOffline: () => {},
});
const result = await api.request({
  url: "/test",
  fetch: async (config) => {
    retryCount++;
    if (retryCount === 1) return { status: 401 };
    return { status: 200, data: "retried" };
  }
});
console.log(result.data);
console.log(refreshCount);`,
        expected: `retried\n1`,
        async: true
      }
    ],
    hints: [
      "request에서 fetch 호출 후 status 코드에 따라 분기",
      "401 처리: refreshPromise를 공유해서 동시 갱신 방지",
      "let refreshPromise = null; 로 관리, 완료 후 null로 리셋",
      "429: Retry-After 헤더 또는 기본 딜레이 후 재시도",
      "인터셉터: 배열로 관리, request 전/response 후 순차 실행"
    ],
    solution: `function solution({ onError, onTokenRefresh, onOffline }) {
  const reqInterceptors = [];
  const resInterceptors = [];
  let refreshPromise = null;
  return {
    async request(config) {
      let cfg = {...config};
      for (const fn of reqInterceptors) cfg = await fn(cfg);
      try {
        let res = await cfg.fetch(cfg);
        for (const fn of resInterceptors) res = await fn(res);
        if (res.status === 401) {
          if (!refreshPromise) refreshPromise = onTokenRefresh().finally(() => { refreshPromise = null; });
          const token = await refreshPromise;
          cfg.token = token;
          res = await cfg.fetch(cfg);
        }
        if (res.status === 403) onError("permission_denied");
        if (res.status === 429) { await new Promise(r => setTimeout(r, 1000)); res = await cfg.fetch(cfg); }
        if (res.status === 500) onError("server_error");
        return res;
      } catch(e) { onOffline(); throw e; }
    },
    addRequestInterceptor(fn) { reqInterceptors.push(fn); },
    addResponseInterceptor(fn) { resInterceptors.push(fn); },
  };
}`
  },
  {
    id: "practical-13",
    category: "practical",
    title: "입력값 포매터/파서",
    description: `전화번호, 카드번호, 금액, 사업자등록번호의 포맷/파스/검증을 구현하세요.

【조건】
- phone: format("01012345678") → "010-1234-5678", parse("010-1234-5678") → "01012345678"
- card: format("4111111111111111") → "4111-1111-1111-1111", type detection (Visa/Master/Amex)
- currency: format(1234567, {prefix:"₩"}) → "₩1,234,567"
- businessNumber: format("1234567890") → "123-45-67890"
- createInputFormatter(type): 실시간 입력 포매터`,
    starter: `function solution() {
  return {
    phone: { format(num) {}, parse(formatted) {}, validate(num) {} },
    card: { format(num) {}, type(num) {}, validate(num) {} },
    currency: { format(num, opts) {}, parse(formatted) {} },
    businessNumber: { format(num) {}, validate(num) {} },
    createInputFormatter(type) {},
  };
}\n`,
    testCases: [
      {
        test: `const fmt = solution();
console.log(fmt.phone.format("01012345678"));
console.log(fmt.phone.parse("010-1234-5678"));
console.log(fmt.phone.format("0212345678"));`,
        expected: `010-1234-5678\n01012345678\n02-1234-5678`
      },
      {
        test: `const fmt = solution();
console.log(fmt.card.format("4111111111111111"));
console.log(fmt.card.type("4111111111111111"));
console.log(fmt.card.type("5500000000000004"));`,
        expected: `4111-1111-1111-1111\nVisa\nMaster`
      },
      {
        test: `const fmt = solution();
console.log(fmt.currency.format(1234567));
console.log(fmt.currency.format(1234567, {prefix:"₩"}));
console.log(fmt.currency.parse("₩1,234,567"));`,
        expected: `1,234,567\n₩1,234,567\n1234567`
      }
    ],
    hints: [
      "phone format: 숫자만 추출 후 02는 2-4-4, 0X0은 3-4-4, 0XX는 3-3-4 패턴",
      "card type: 4로 시작=Visa, 51-55=Master, 34/37=Amex, 62=UnionPay",
      "currency format: Number.toLocaleString() 또는 정규식으로 3자리마다 쉼표",
      "parse: 숫자 외 문자 모두 제거 (replace(/[^0-9]/g, ''))",
      "businessNumber: 3-2-5 패턴으로 하이픈 삽입"
    ],
    solution: `function solution() {
  return {
    phone: {
      format(n) { const d = n.replace(/[^0-9]/g,"");
        if (d.startsWith("02")) { return d.length<=9 ? d.replace(/(\\d{2})(\\d{3,4})(\\d{4})/,"$1-$2-$3") : d.replace(/(\\d{2})(\\d{4})(\\d{4})/,"$1-$2-$3"); }
        return d.replace(/(\\d{3})(\\d{3,4})(\\d{4})/,"$1-$2-$3"); },
      parse(f) { return f.replace(/[^0-9]/g,""); },
      validate(n) { return /^(01[016789]|02|0[3-9]\\d)\\d{7,8}$/.test(n.replace(/[^0-9]/g,"")); }
    },
    card: {
      format(n) { const d = n.replace(/[^0-9]/g,""); return d.match(/.{1,4}/g)?.join("-") || d; },
      type(n) { const d = n.replace(/[^0-9]/g,""); if(/^4/.test(d))return"Visa"; if(/^5[1-5]/.test(d))return"Master"; if(/^3[47]/.test(d))return"Amex"; if(/^62/.test(d))return"UnionPay"; return"Unknown"; },
      validate(n) { return n.replace(/[^0-9]/g,"").length >= 13; }
    },
    currency: {
      format(n, opts={}) { const s = Math.abs(n).toLocaleString("en-US"); return (opts.prefix||"") + (n<0?"-":"") + s + (opts.suffix||""); },
      parse(f) { return Number(f.replace(/[^0-9.-]/g,"")); }
    },
    businessNumber: {
      format(n) { const d = n.replace(/[^0-9]/g,""); return d.replace(/(\\d{3})(\\d{2})(\\d{5})/,"$1-$2-$3"); },
      validate(n) { return n.replace(/[^0-9]/g,"").length === 10; }
    },
    createInputFormatter(type) { const self = this; return (val) => self[type]?.format(val) || val; }
  };
}`
  },
  {
    id: "practical-14",
    category: "practical",
    title: "알림 큐 매니저",
    description: `토스트 알림 시스템을 구현하세요.

【조건】
- add(notification): 알림 추가. { type, message, duration, persistent, dedupeKey }
- 최대 표시 수(maxVisible, 기본 3) 초과 시 큐에 대기
- dedupeKey가 같으면 새로 추가하지 않고 카운트 증가
- tick(ms): 시간 경과 처리. duration 지난 알림 자동 제거
- persistent: true면 자동 제거 안 됨
- dismiss(id): 수동 제거
- dismissAll(): 전체 제거
- getVisible(): 현재 표시 중인 알림들
- getPendingCount(): 대기 중인 알림 수
- onChange(callback): 상태 변경 구독`,
    starter: `function solution({ maxVisible = 3, defaultDuration = 3000, now } = {}) {
  return {
    add(notification) {},
    dismiss(id) {},
    dismissAll() {},
    getVisible() {},
    getPendingCount() {},
    tick(ms) {},
    onChange(callback) {},
  };
}\n`,
    testCases: [
      {
        test: `const mgr = solution({maxVisible:2, defaultDuration:3000});
mgr.add({id:"a",message:"Hello"});
mgr.add({id:"b",message:"World"});
mgr.add({id:"c",message:"Queue"});
console.log(mgr.getVisible().length);
console.log(mgr.getPendingCount());`,
        expected: `2\n1`
      },
      {
        test: `const mgr = solution({maxVisible:3, defaultDuration:1000});
mgr.add({id:"a",message:"Hello"});
mgr.add({id:"b",message:"World"});
mgr.tick(1000);
console.log(mgr.getVisible().length);`,
        expected: `0`
      },
      {
        test: `const mgr = solution({maxVisible:3, defaultDuration:3000});
mgr.add({id:"a",message:"Error",dedupeKey:"err"});
mgr.add({id:"b",message:"Error",dedupeKey:"err"});
const visible = mgr.getVisible();
console.log(visible.length);
console.log(visible[0].count);`,
        expected: `1\n2`
      }
    ],
    hints: [
      "visible 배열과 pending 큐를 따로 관리",
      "add: visible이 max 미만이면 visible에, 아니면 pending에",
      "dedupeKey 체크: visible+pending에서 같은 key 찾으면 count 증가",
      "tick: 각 알림의 남은 시간 감소, 0 이하면 제거. persistent는 skip",
      "제거 시 pending에서 visible로 승격"
    ],
    solution: `function solution({ maxVisible = 3, defaultDuration = 3000 } = {}) {
  let visible = [], pending = [], nextId = 1;
  const listeners = [];
  function notify() { listeners.forEach(fn => fn(visible, pending)); }
  function promote() { while (visible.length < maxVisible && pending.length) { visible.push(pending.shift()); } }
  return {
    add(n) {
      const key = n.dedupeKey;
      if (key) {
        const existing = [...visible, ...pending].find(x => x.dedupeKey === key);
        if (existing) { existing.count = (existing.count || 1) + 1; notify(); return existing.id; }
      }
      const item = { ...n, id: n.id || "n" + nextId++, duration: n.duration ?? defaultDuration, elapsed: 0, count: 1 };
      if (visible.length < maxVisible) visible.push(item); else pending.push(item);
      notify(); return item.id;
    },
    dismiss(id) { visible = visible.filter(n => n.id !== id); pending = pending.filter(n => n.id !== id); promote(); notify(); },
    dismissAll() { visible = []; pending = []; notify(); },
    getVisible() { return [...visible]; },
    getPendingCount() { return pending.length; },
    tick(ms) {
      visible = visible.filter(n => { if (n.persistent) return true; n.elapsed = (n.elapsed||0) + ms; return n.elapsed < (n.duration); });
      promote(); notify();
    },
    onChange(cb) { listeners.push(cb); return () => { const i = listeners.indexOf(cb); if(i>=0) listeners.splice(i,1); }; }
  };
}`
  },
  {
    id: "practical-15",
    category: "practical",
    title: "테이블 다중 선택 매니저",
    description: `테이블 체크박스 선택 관리를 구현하세요.

【조건】
- toggle(id): 단일 토글
- rangeSelect(id, lastId, pageIds): Shift+클릭 범위 선택
- toggleAll(pageIds): 현재 페이지 전체 선택/해제
- isSelected(id): O(1) 선택 확인
- getSelected(): 선택된 id 목록
- count(): 선택 수
- clear(): 전체 해제
- getPageState(pageIds): "all" | "some" | "none"
- applyAction(action, pageIds): 벌크 액션 후 자동 clear`,
    starter: `function solution() {
  return {
    toggle(id) {},
    rangeSelect(id, lastId, pageIds) {},
    toggleAll(pageIds) {},
    isSelected(id) {},
    getSelected() {},
    count() {},
    clear() {},
    getPageState(pageIds) {},
    applyAction(action) {},
  };
}\n`,
    testCases: [
      {
        test: `const sel = solution();
sel.toggle("a");
sel.toggle("b");
console.log(sel.isSelected("a"));
console.log(sel.count());
sel.toggle("a");
console.log(sel.isSelected("a"));
console.log(sel.count());`,
        expected: `true\n2\nfalse\n1`
      },
      {
        test: `const sel = solution();
const page = ["a","b","c","d","e"];
sel.rangeSelect("b", "d", page);
console.log(sel.getSelected().sort().join(","));`,
        expected: `b,c,d`
      },
      {
        test: `const sel = solution();
const page = ["a","b","c"];
sel.toggleAll(page);
console.log(sel.getPageState(page));
sel.toggle("a");
console.log(sel.getPageState(page));
sel.toggle("b");
sel.toggle("c");
console.log(sel.getPageState(page));`,
        expected: `all\nsome\nnone`
      }
    ],
    hints: [
      "Set으로 선택 상태 관리 → O(1) isSelected",
      "toggle: has면 delete, 없으면 add",
      "rangeSelect: pageIds에서 두 id의 인덱스 찾아서 slice",
      "toggleAll: 모두 선택됐으면 전체 해제, 아니면 전체 선택",
      "getPageState: 전부 있으면 all, 하나라도 있으면 some, 없으면 none"
    ],
    solution: `function solution() {
  const selected = new Set();
  return {
    toggle(id) { selected.has(id) ? selected.delete(id) : selected.add(id); },
    rangeSelect(id, lastId, pageIds) {
      const i1 = pageIds.indexOf(id), i2 = pageIds.indexOf(lastId);
      const [from, to] = i1 < i2 ? [i1, i2] : [i2, i1];
      for (let i = from; i <= to; i++) selected.add(pageIds[i]);
    },
    toggleAll(pageIds) {
      const allSel = pageIds.every(id => selected.has(id));
      pageIds.forEach(id => allSel ? selected.delete(id) : selected.add(id));
    },
    isSelected(id) { return selected.has(id); },
    getSelected() { return [...selected]; },
    count() { return selected.size; },
    clear() { selected.clear(); },
    getPageState(pageIds) {
      const count = pageIds.filter(id => selected.has(id)).length;
      if (count === 0) return "none";
      if (count === pageIds.length) return "all";
      return "some";
    },
    applyAction(action) { const ids = [...selected]; action(ids); selected.clear(); return ids; }
  };
}`
  },

  // ======================== TOSS CHALLENGES ========================
  {
    id: "toss-01",
    category: "toss",
    title: "송금 금액 입력기",
    description: `토스 송금 화면의 금액 입력 로직을 구현하세요.

【조건】
- pressDigit(digit): 숫자 키패드 입력. 맨 앞 0은 무시.
- backspace(): 마지막 숫자 삭제
- clear(): 전체 삭제
- addPreset(amount): +1만, +5만, +10만 등 금액 추가
- setMax(): 잔액 전체 입력
- getState() 반환: { raw, display, korean, isValid, errorMessage, remainBalance }

【한글 표기 규칙】
1만 미만: 빈 문자열
10,000 → "1만"
50,000 → "5만"
100,000 → "10만"
1,000,000 → "100만"
100,000,000 → "1억"
150,000,000 → "1억 5,000만"

【유의사항】
- 선행 0 방지
- addPreset으로 잔액 초과 시 잔액까지만 또는 에러
- minAmount 미만이면 isValid: false + 에러 메시지
- maxAmount 초과이면 isValid: false + 에러 메시지`,
    starter: `function solution({ balance, minAmount = 1, maxAmount }) {
  return {
    pressDigit(digit) {},
    backspace() {},
    clear() {},
    addPreset(amount) {},
    getState() {},
    setMax() {},
  };
}\n`,
    testCases: [
      {
        test: `const input = solution({balance:1000000, minAmount:1000, maxAmount:5000000});
input.pressDigit(5);
input.pressDigit(0);
input.pressDigit(0);
input.pressDigit(0);
input.pressDigit(0);
const s = input.getState();
console.log(s.raw);
console.log(s.display);
console.log(s.korean);
console.log(s.isValid);`,
        expected: `50000\n50,000\n5만\ntrue`
      },
      {
        test: `const input = solution({balance:1000000, minAmount:1000});
input.pressDigit(0);
input.pressDigit(5);
console.log(input.getState().raw);
input.setMax();
const s = input.getState();
console.log(s.raw);
console.log(s.remainBalance);`,
        expected: `5\n1000000\n0`
      },
      {
        test: `const input = solution({balance:1000000, minAmount:1000, maxAmount:5000000});
input.pressDigit(5);
const s = input.getState();
console.log(s.isValid);
console.log(s.errorMessage !== null);`,
        expected: `false\ntrue`
      }
    ],
    hints: [
      "내부에 digits 문자열을 관리. pressDigit: digits += digit (선행 0 체크)",
      "display: Number(digits).toLocaleString()",
      "korean: 억 단위와 만 단위를 나눠서 조합",
      "const 억 = Math.floor(raw / 100000000), 만 = Math.floor((raw % 100000000) / 10000)",
      "validation: raw < minAmount이면 에러, raw > balance이면 에러"
    ],
    solution: `function solution({balance, minAmount = 1, maxAmount}) {
  maxAmount = maxAmount || balance;
  let raw = 0;
  function toKorean(n) {
    if (n < 10000) return "";
    const uk = Math.floor(n / 100000000);
    const man = Math.floor((n % 100000000) / 10000);
    let s = "";
    if (uk > 0) s += uk + "억";
    if (man > 0) s += (s ? " " : "") + man.toLocaleString() + "만";
    return s;
  }
  return {
    pressDigit(d) { if (raw === 0 && d === 0) return; raw = raw * 10 + d; },
    backspace() { raw = Math.floor(raw / 10); },
    clear() { raw = 0; },
    addPreset(amount) { raw += amount; if (raw > balance) raw = balance; },
    setMax() { raw = Math.min(balance, maxAmount); },
    getState() {
      let errorMessage = null, isValid = true;
      if (raw < minAmount) { isValid = false; errorMessage = "최소 " + minAmount.toLocaleString() + "원 이상"; }
      if (raw > maxAmount) { isValid = false; errorMessage = "최대 " + maxAmount.toLocaleString() + "원까지"; }
      if (raw > balance) { isValid = false; errorMessage = "잔액이 부족합니다"; }
      return { raw, display: raw.toLocaleString(), korean: toKorean(raw), isValid, errorMessage, remainBalance: balance - raw };
    }
  };
}`
  },
  {
    id: "toss-02",
    category: "toss",
    title: "거래 내역 그루핑",
    description: `계좌 거래내역을 날짜별/월별 그루핑, 필터링, 검색, 요약을 구현하세요.

【조건】
- groupByDate(transactions): "오늘"/"어제"/날짜별 그루핑, 시간 역순 정렬
- groupByMonth(transactions): "이번 달"/"지난 달"/월별 그루핑
- filter({ type, minAmount, maxAmount, category }): 조건 필터링
- search(query): 거래처/메모 검색
- summary(yearMonth): 월별 입금/출금/순수익 요약
- spendingByCategory(yearMonth): 카테고리별 지출 비율 (합계 100%)

transaction 형태:
{ id, date, type("deposit"|"withdraw"), amount, counterpart, memo, category }`,
    starter: `function solution(transactions, today) {
  return {
    groupByDate() {},
    groupByMonth() {},
    filter(conditions) {},
    search(query) {},
    summary(yearMonth) {},
    spendingByCategory(yearMonth) {},
  };
}\n`,
    testCases: [
      {
        test: `const txs = [
  {id:1,date:"2024-03-15T14:00:00",type:"withdraw",amount:15000,counterpart:"스타벅스",category:"카페"},
  {id:2,date:"2024-03-15T10:00:00",type:"deposit",amount:3000000,counterpart:"회사",category:"급여"},
  {id:3,date:"2024-03-14T18:00:00",type:"withdraw",amount:25000,counterpart:"배달의민족",category:"식비"},
];
const s = solution(txs, new Date("2024-03-15T20:00:00"));
const groups = s.groupByDate();
console.log(groups[0].label);
console.log(groups[0].items.length);
console.log(groups[0].items[0].counterpart);`,
        expected: `오늘\n2\n스타벅스`
      },
      {
        test: `const txs = [
  {id:1,date:"2024-03-15",type:"deposit",amount:3000000,counterpart:"회사",category:"급여"},
  {id:2,date:"2024-03-10",type:"withdraw",amount:50000,counterpart:"마트",category:"식비"},
  {id:3,date:"2024-03-05",type:"withdraw",amount:30000,counterpart:"카페",category:"카페"},
];
const s = solution(txs, new Date("2024-03-15"));
const sum = s.summary("2024-03");
console.log(sum.deposit);
console.log(sum.withdraw);
console.log(sum.net);`,
        expected: `3000000\n80000\n2920000`
      }
    ],
    hints: [
      "groupByDate: 날짜 문자열 기준 그루핑. today와 비교해 '오늘'/'어제' 라벨",
      "시간 역순: sort((a,b) => new Date(b.date) - new Date(a.date))",
      "filter: 조건들을 AND로 결합. type/amount/category 각각 체크",
      "summary: filter로 해당 월 추출 후 reduce로 deposit/withdraw 합산",
      "spendingByCategory: withdraw만 모아서 카테고리별 합계, 비율 = Math.round(금액/총액*100)"
    ],
    solution: `function solution(transactions, today) {
  const todayStr = today.toISOString().slice(0,10);
  const yesterdayD = new Date(today); yesterdayD.setDate(yesterdayD.getDate()-1);
  const yesterdayStr = yesterdayD.toISOString().slice(0,10);
  let filtered = [...transactions];
  return {
    groupByDate() {
      const groups = new Map();
      const sorted = [...filtered].sort((a,b) => new Date(b.date)-new Date(a.date));
      sorted.forEach(tx => {
        const d = tx.date.slice(0,10);
        let label = d;
        if (d === todayStr) label = "오늘";
        else if (d === yesterdayStr) label = "어제";
        if (!groups.has(label)) groups.set(label, []);
        groups.get(label).push(tx);
      });
      return [...groups.entries()].map(([label, items]) => ({label, items}));
    },
    groupByMonth() {
      const groups = new Map();
      const sorted = [...filtered].sort((a,b) => new Date(b.date)-new Date(a.date));
      const thisMonth = todayStr.slice(0,7);
      const lm = new Date(today); lm.setMonth(lm.getMonth()-1);
      const lastMonth = lm.toISOString().slice(0,7);
      sorted.forEach(tx => {
        const m = tx.date.slice(0,7);
        let label = m; if(m===thisMonth) label="이번 달"; else if(m===lastMonth) label="지난 달";
        if(!groups.has(label)) groups.set(label,[]);
        groups.get(label).push(tx);
      });
      return [...groups.entries()].map(([label,items])=>({label,items}));
    },
    filter(cond) {
      filtered = transactions.filter(tx => {
        if(cond.type && tx.type!==cond.type) return false;
        if(cond.minAmount && tx.amount<cond.minAmount) return false;
        if(cond.maxAmount && tx.amount>cond.maxAmount) return false;
        if(cond.category && tx.category!==cond.category) return false;
        return true;
      });
      return this;
    },
    search(q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(tx => (tx.counterpart||"").toLowerCase().includes(ql) || (tx.memo||"").toLowerCase().includes(ql));
      return this;
    },
    summary(ym) {
      const txs = transactions.filter(tx => tx.date.startsWith(ym));
      let deposit=0,withdraw=0;
      txs.forEach(tx => { if(tx.type==="deposit") deposit+=tx.amount; else withdraw+=tx.amount; });
      return {deposit, withdraw, net: deposit-withdraw};
    },
    spendingByCategory(ym) {
      const txs = transactions.filter(tx => tx.date.startsWith(ym) && tx.type==="withdraw");
      const cats = {}; let total = 0;
      txs.forEach(tx => { cats[tx.category] = (cats[tx.category]||0) + tx.amount; total += tx.amount; });
      return Object.entries(cats).map(([category,amount]) => ({category, amount, ratio: Math.round(amount/total*100)}));
    }
  };
}`
  },
  {
    id: "toss-03",
    category: "toss",
    title: "정산/더치페이 계산기",
    description: `토스 스타일 정산 시스템을 구현하세요.

【조건】
- addMember(name): 멤버 추가
- addExpense({ paidBy, amount, splitType, members, ... }): 비용 추가
  - splitType: "equal" (균등), "exact" (직접 입력), "shares" (비율), "exclude" (특정 인원 제외)
- calculate(): 각자 얼마를 냈는지, 얼마를 내야 하는지, 잔액 계산
- optimize(): 송금 횟수를 최소화한 정산 내역
- summary(): 전체 요약

【유의사항】
- 금액 나눌 때 1원 단위 반올림, 첫 번째 사람이 나머지 부담
- optimize는 송금 횟수 최소화 알고리즘`,
    starter: `function solution() {
  return {
    addMember(name) {},
    addExpense({ paidBy, amount, splitType, members, splits, excludes }) {},
    calculate() {},
    optimize() {},
    summary() {},
  };
}\n`,
    testCases: [
      {
        test: `const dutch = solution();
dutch.addMember("A");
dutch.addMember("B");
dutch.addMember("C");
dutch.addExpense({paidBy:"A",amount:30000,splitType:"equal"});
const calc = dutch.calculate();
console.log(calc.A.paid);
console.log(calc.A.owes);
console.log(calc.B.balance);`,
        expected: `30000\n10000\n-10000`
      },
      {
        test: `const dutch = solution();
dutch.addMember("A");
dutch.addMember("B");
dutch.addMember("C");
dutch.addExpense({paidBy:"A",amount:30000,splitType:"equal"});
dutch.addExpense({paidBy:"B",amount:20000,splitType:"exclude",excludes:["C"]});
const opt = dutch.optimize();
console.log(opt.length <= 2);`,
        expected: `true`
      }
    ],
    hints: [
      "각 멤버별 paid(총 낸 돈)와 owes(내야 할 돈)를 추적",
      "equal: amount / members.length (없으면 전체 멤버)",
      "exclude: 제외된 사람 빼고 나머지로 균등 분배",
      "balance = paid - owes. 양수면 받아야 할 돈, 음수면 줘야 할 돈",
      "optimize: balance로 정렬, 양수(받을 사람)와 음수(줄 사람) 매칭"
    ],
    solution: `function solution() {
  const members = [];
  const expenses = [];
  return {
    addMember(name) { members.push(name); },
    addExpense(exp) { expenses.push(exp); },
    calculate() {
      const result = {};
      members.forEach(m => result[m] = {paid:0, owes:0, balance:0});
      expenses.forEach(exp => {
        result[exp.paidBy].paid += exp.amount;
        let targets = exp.members || [...members];
        if (exp.splitType === "exclude") targets = members.filter(m => !(exp.excludes||[]).includes(m));
        if (exp.splitType === "equal" || exp.splitType === "exclude") {
          const share = Math.floor(exp.amount / targets.length);
          const remainder = exp.amount - share * targets.length;
          targets.forEach((m,i) => { result[m].owes += share + (i===0?remainder:0); });
        } else if (exp.splitType === "exact") {
          Object.entries(exp.splits).forEach(([m,v]) => result[m].owes += v);
        } else if (exp.splitType === "shares") {
          const total = Object.values(exp.splits).reduce((a,b)=>a+b,0);
          Object.entries(exp.splits).forEach(([m,v]) => result[m].owes += Math.round(exp.amount*v/total));
        }
      });
      members.forEach(m => result[m].balance = result[m].paid - result[m].owes);
      return result;
    },
    optimize() {
      const calc = this.calculate();
      const balances = members.map(m => ({name:m, balance:calc[m].balance})).filter(m=>m.balance!==0);
      balances.sort((a,b) => a.balance - b.balance);
      const transfers = [];
      let i=0, j=balances.length-1;
      while(i<j) {
        const amount = Math.min(-balances[i].balance, balances[j].balance);
        transfers.push({from:balances[i].name, to:balances[j].name, amount});
        balances[i].balance += amount;
        balances[j].balance -= amount;
        if(balances[i].balance===0) i++;
        if(balances[j].balance===0) j--;
      }
      return transfers;
    },
    summary() { return {members:[...members], expenses:[...expenses], calculation:this.calculate(), transfers:this.optimize()}; }
  };
}`
  },
  {
    id: "toss-04",
    category: "toss",
    title: "카드 혜택 매칭",
    description: `결제 시 최적의 카드를 추천합니다.

【조건】
- recommend(payment): 최대 혜택 카드 추천. { category, amount, date }
- calculateBenefit(cardId, payment): 특정 카드의 혜택 계산
- getUsageSummary(cardId): 월별 사용 현황
- recordPayment(cardId, payment): 결제 기록

【혜택 조건】
- 카테고리 매칭
- 혜택 타입: discount, cashback, point
- 건당 최대 할인
- 월 최대 한도 (잔여 계산)
- 전월 실적 충족 여부
- 요일 제한`,
    starter: `function solution(userCards) {
  // userCards: [{ id, name, benefits: [{ category, type, rate, maxPerTx, monthlyMax, minSpend, days }], lastMonthSpend }]
  return {
    recommend(payment) {},
    calculateBenefit(cardId, payment) {},
    getUsageSummary(cardId) {},
    recordPayment(cardId, payment) {},
  };
}\n`,
    testCases: [
      {
        test: `const cards = solution([
  {id:"c1",name:"카드A",benefits:[{category:"식비",type:"discount",rate:10,maxPerTx:5000,monthlyMax:30000,minSpend:300000}],lastMonthSpend:500000},
  {id:"c2",name:"카드B",benefits:[{category:"식비",type:"cashback",rate:5,maxPerTx:3000,monthlyMax:15000,minSpend:500000}],lastMonthSpend:200000},
]);
const rec = cards.recommend({category:"식비",amount:30000,date:"2024-03-15"});
console.log(rec.cardId);`,
        expected: `c1`
      },
      {
        test: `const cards = solution([
  {id:"c1",name:"카드A",benefits:[{category:"식비",type:"discount",rate:10,maxPerTx:5000,monthlyMax:30000}],lastMonthSpend:0},
]);
const b = cards.calculateBenefit("c1", {category:"식비",amount:80000,date:"2024-03-15"});
console.log(b.amount);`,
        expected: `5000`
      }
    ],
    hints: [
      "각 카드별로 월별 사용액을 추적하는 Map 관리",
      "recommend: 모든 카드에 calculateBenefit 호출해서 최대 혜택 카드 선택",
      "calculateBenefit: 카테고리 매칭 → minSpend 체크 → rate 적용 → maxPerTx 적용 → monthlyMax 잔여 체크",
      "요일 제한: new Date(date).getDay()로 체크",
      "recordPayment: 월별 사용액 누적, monthlyMax 감소 반영"
    ],
    solution: `function solution(userCards) {
  const usage = new Map();
  userCards.forEach(c => usage.set(c.id, {monthlyUsed: 0}));
  function calcBenefit(card, payment) {
    const benefit = card.benefits.find(b => b.category === payment.category);
    if (!benefit) return {amount: 0, type: null};
    if (benefit.minSpend && (card.lastMonthSpend || 0) < benefit.minSpend) return {amount: 0, type: null};
    if (benefit.days) { const day = new Date(payment.date).getDay(); if (!benefit.days.includes(day)) return {amount:0,type:null}; }
    let amount = Math.round(payment.amount * benefit.rate / 100);
    if (benefit.maxPerTx) amount = Math.min(amount, benefit.maxPerTx);
    const used = usage.get(card.id)?.monthlyUsed || 0;
    if (benefit.monthlyMax) amount = Math.min(amount, benefit.monthlyMax - used);
    return {amount: Math.max(0, amount), type: benefit.type};
  }
  return {
    recommend(payment) {
      let best = null, bestAmt = 0;
      userCards.forEach(card => {
        const b = calcBenefit(card, payment);
        if (b.amount > bestAmt) { bestAmt = b.amount; best = {cardId:card.id, cardName:card.name, benefit:b}; }
      });
      return best;
    },
    calculateBenefit(cardId, payment) {
      const card = userCards.find(c => c.id === cardId);
      return card ? calcBenefit(card, payment) : {amount:0, type:null};
    },
    getUsageSummary(cardId) { return usage.get(cardId) || {monthlyUsed:0}; },
    recordPayment(cardId, payment) {
      const u = usage.get(cardId);
      if (u) { const b = this.calculateBenefit(cardId, payment); u.monthlyUsed += b.amount; }
    }
  };
}`
  },

  // ======================== ASYNC CHALLENGES ========================
  {
    id: "async-00",
    category: "async",
    title: "한 번에 하나씩 (Token Chaining)",
    description: `동시에 여러 번 호출되어도 규칙에 따라 토큰과 함께 순차적으로 요청하는 함수를 작성하세요.

【규칙】
1. 첫 번째 API 요청은 무조건 성공. 응답으로 result와 token을 반환.
2. 두 번째 요청은 첫 번째 요청에서 반환된 token을 실어 전송.
3. 이후 모든 요청은 직전 요청의 token을 전송.
4. 직전 요청의 token 없이 전송하면 오류.

【조건】
- callAPI 함수: (token?) => Promise<{result, token}>
- solution 함수를 동시에 여러 번 호출할 수 있음
- callAPI는 직접 변경 불가, 실패하지 않음`,
    starter: `async function solution(callAPI) {
  // 구현
}\n`,
    testCases: [
      {
        test: `let callCount = 0;
let lastToken = null;
const callAPI = async (token) => {
  callCount++;
  if (callCount > 1 && token !== lastToken) throw new Error("wrong token");
  const newToken = "tok" + callCount;
  lastToken = newToken;
  return { result: "r" + callCount, token: newToken };
};
const [r1, r2] = await Promise.all([solution(callAPI), solution(callAPI)]);
console.log(r1);
console.log(r2);`,
        expected: `r1\nr2`,
        async: true
      }
    ],
    hints: [
      "전역 큐(Promise 체인)를 사용해 순차 실행을 보장",
      "let chain = Promise.resolve(); 으로 체인 초기화",
      "각 solution 호출이 chain에 자기 작업을 연결",
      "chain = chain.then(() => callAPI(lastToken))",
      "chain을 통해 이전 요청이 완료되어야 다음 요청이 실행됨"
    ],
    solution: `let chain = Promise.resolve();
let lastToken = undefined;
async function solution(callAPI) {
  return new Promise((resolve) => {
    chain = chain.then(async () => {
      const { result, token } = await callAPI(lastToken);
      lastToken = token;
      resolve(result);
    });
  });
}`
  },
  {
    id: "async-01",
    category: "async",
    title: "순서대로 하나씩 (Rate Limiter)",
    description: `동시 실행 수를 제한하는 실행기를 만드세요.

【조건】
- maxConcurrency 이하로만 동시 실행
- 초과 요청은 FIFO 큐에서 대기
- 실행 중인 작업이 완료되면 큐에서 다음 작업 실행`,
    starter: `function solution(maxConcurrency) {
  return async function execute(callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `const execute = solution(2);
let running = 0, maxRunning = 0;
const task = (id, ms) => execute(async () => {
  running++;
  maxRunning = Math.max(maxRunning, running);
  await new Promise(r => setTimeout(r, ms));
  running--;
  return id;
});
const results = await Promise.all([task("a",50), task("b",50), task("c",50)]);
console.log(maxRunning);
console.log(results.join(","));`,
        expected: `2\na,b,c`,
        async: true
      }
    ],
    hints: [
      "running 카운터와 queue 배열을 클로저로 관리",
      "execute 호출 시 running < max면 바로 실행, 아니면 큐에 넣기",
      "큐에 넣을 때 Promise를 만들고 resolve를 큐에 저장",
      "작업 완료 시 running--, 큐에 대기 중인 것이 있으면 꺼내서 실행",
      "try-finally로 running 감소를 보장"
    ],
    solution: `function solution(maxConcurrency) {
  let running = 0;
  const queue = [];
  function next() { if (queue.length && running < maxConcurrency) { running++; const fn = queue.shift(); fn(); } }
  return function execute(callAPI) {
    return new Promise((resolve, reject) => {
      const run = async () => { try { resolve(await callAPI()); } catch(e) { reject(e); } finally { running--; next(); } };
      if (running < maxConcurrency) { running++; run(); } else { queue.push(run); }
    });
  };
}`
  },
  {
    id: "async-02",
    category: "async",
    title: "캐시는 한 번만 (Dedup Fetcher)",
    description: `같은 키의 동시 요청을 중복 제거합니다.

【조건】
- 같은 key의 동시 요청은 하나의 Promise를 공유
- 요청 완료(성공/실패) 후 캐시 삭제 (영구 캐시 아님)
- 다른 key는 독립 실행`,
    starter: `function solution() {
  return function fetch(key, callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `const fetch = solution();
let callCount = 0;
const api = async () => { callCount++; await new Promise(r=>setTimeout(r,50)); return "data"; };
const [r1,r2] = await Promise.all([fetch("k1",api), fetch("k1",api)]);
console.log(r1);
console.log(r2);
console.log(callCount);`,
        expected: `data\ndata\n1`,
        async: true
      },
      {
        test: `const fetch = solution();
let c1=0, c2=0;
const api1 = async () => { c1++; return "a"; };
const api2 = async () => { c2++; return "b"; };
const [r1,r2] = await Promise.all([fetch("k1",api1), fetch("k2",api2)]);
console.log(r1);
console.log(r2);
console.log(c1);
console.log(c2);`,
        expected: `a\nb\n1\n1`,
        async: true
      }
    ],
    hints: [
      "Map<key, Promise>로 진행 중인 요청을 관리",
      "fetch 호출 시 Map에 key가 있으면 기존 Promise 반환",
      "없으면 callAPI() 호출하고 그 Promise를 Map에 저장",
      "Promise가 resolve/reject 되면 Map에서 삭제",
      ".finally(() => map.delete(key))로 정리"
    ],
    solution: `function solution() {
  const inflight = new Map();
  return function fetch(key, callAPI) {
    if (inflight.has(key)) return inflight.get(key);
    const p = callAPI().finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
  };
}`
  },
  {
    id: "async-03",
    category: "async",
    title: "마지막 것만 (Latest Only)",
    description: `자동완성 검색처럼, 마지막 호출의 결과만 유효합니다.

【조건】
- 새 search 호출이 오면 이전 대기 중인 호출은 "cancelled"로 reject
- callAPI는 실제로 계속 실행되지만 결과는 무시
- 마지막 search만 정상 resolve`,
    starter: `function solution() {
  return function search(callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `const search = solution();
const results = [];
const errors = [];
const p1 = search(async()=>{await new Promise(r=>setTimeout(r,100));return "a";}).then(r=>results.push(r)).catch(e=>errors.push(e.message));
const p2 = search(async()=>{await new Promise(r=>setTimeout(r,50));return "b";}).then(r=>results.push(r)).catch(e=>errors.push(e.message));
await Promise.allSettled([p1,p2]);
console.log(results.join(","));
console.log(errors.join(","));`,
        expected: `b\ncancelled`,
        async: true
      }
    ],
    hints: [
      "요청 ID 카운터로 '최신' 여부를 판단",
      "let currentId = 0; 각 search 호출 시 id = ++currentId",
      "callAPI 완료 후 id === currentId인 경우만 resolve",
      "id !== currentId이면 reject('cancelled')",
      "이전 호출의 reject를 저장해두고 새 호출 시 호출"
    ],
    solution: `function solution() {
  let currentId = 0;
  let rejectPrev = null;
  return function search(callAPI) {
    const id = ++currentId;
    if (rejectPrev) { rejectPrev(new Error("cancelled")); rejectPrev = null; }
    return new Promise((resolve, reject) => {
      rejectPrev = reject;
      callAPI().then(result => {
        if (id === currentId) { rejectPrev = null; resolve(result); }
      });
    });
  };
}`
  },
  {
    id: "async-04",
    category: "async",
    title: "재시도는 똑똑하게 (Retry with Backoff)",
    description: `실패한 API 호출을 지수 백오프로 재시도합니다.

【조건】
- 최대 maxRetries회 재시도 (총 시도 = maxRetries + 1)
- 재시도 간격: delay, delay*2, delay*4, ... (지수 백오프)
- 같은 key의 동시 호출은 결과 공유 (dedup)
- wait(fn, ms) 함수가 주어짐 (setTimeout 대신 사용)`,
    starter: `function solution({ maxRetries, delay, wait }) {
  return function execute(key, callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `let attempt = 0;
const waits = [];
const execute = solution({
  maxRetries: 3,
  delay: 100,
  wait: async (fn, ms) => { waits.push(ms); await new Promise(r=>setTimeout(r,1)); if(fn)fn(); },
});
try {
  await execute("k", async () => {
    attempt++;
    if (attempt < 3) throw new Error("fail");
    return "ok";
  });
  console.log("ok");
  console.log(attempt);
  console.log(waits[0]);
  console.log(waits[1]);
} catch(e) { console.log(e.message); }`,
        expected: `ok\n3\n100\n200`,
        async: true
      }
    ],
    hints: [
      "for 루프로 maxRetries + 1 번 시도",
      "실패 시 wait(null, delay * 2^i)로 대기",
      "key별 dedup: Map<key, Promise>로 동시 호출 공유",
      "마지막 시도도 실패하면 에러 throw",
      "finally에서 dedup Map 정리"
    ],
    solution: `function solution({ maxRetries, delay, wait }) {
  const inflight = new Map();
  return function execute(key, callAPI) {
    if (inflight.has(key)) return inflight.get(key);
    const p = (async () => {
      for (let i = 0; i <= maxRetries; i++) {
        try { return await callAPI(); } catch(e) {
          if (i === maxRetries) throw e;
          await wait(null, delay * Math.pow(2, i));
        }
      }
    })().finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
  };
}`
  },
  {
    id: "async-05",
    category: "async",
    title: "의존성 그래프 (Task Scheduler)",
    description: `의존성이 있는 태스크를 병렬로 최대한 실행합니다.

【조건】
- tasks: [{ name, deps: [name, ...], run(depResults) }]
- deps가 모두 완료되어야 해당 태스크 실행 가능
- 의존성 없는 태스크는 동시에 실행
- 각 태스크의 run에는 의존성 결과 {[name]: result} 전달
- 결과: { [name]: result }`,
    starter: `async function solution(tasks) {
  // 구현
}\n`,
    testCases: [
      {
        test: `const results = await solution([
  {name:"a", deps:[], run:async()=>"A"},
  {name:"b", deps:[], run:async()=>"B"},
  {name:"c", deps:["a","b"], run:async(r)=>r.a+r.b},
]);
console.log(results.a);
console.log(results.b);
console.log(results.c);`,
        expected: `A\nB\nAB`,
        async: true
      }
    ],
    hints: [
      "각 태스크를 Promise로 만들고 deps의 Promise가 모두 resolve되면 실행",
      "Map<name, {promise, resolve}>로 관리",
      "deps가 없는 태스크부터 즉시 실행",
      "Promise.all(deps.map(d => promiseMap.get(d)))로 의존성 대기",
      "모든 태스크 완료 후 결과 객체 반환"
    ],
    solution: `async function solution(tasks) {
  const results = {};
  const promises = new Map();
  tasks.forEach(t => {
    promises.set(t.name, (async () => {
      const depResults = {};
      if (t.deps.length) {
        await Promise.all(t.deps.map(async d => { depResults[d] = await promises.get(d); }));
      }
      const result = await t.run(depResults);
      results[t.name] = result;
      return result;
    })());
  });
  await Promise.all([...promises.values()]);
  return results;
}`
  },
  {
    id: "async-06",
    category: "async",
    title: "모아서 한 번에 (Batch Processor)",
    description: `개별 get(id) 호출을 시간 윈도우 내에서 모아 하나의 batchFn(ids)로 실행합니다.

【조건】
- delayMs 이내의 get 호출을 모아서 한 번에 batchFn 호출
- maxBatchSize 도달 시 즉시 flush
- 각 get은 자기 id에 해당하는 결과만 받음
- schedule(fn, ms)와 schedule.cancel(id) 사용 (setTimeout 대신)`,
    starter: `function solution({ batchFn, delayMs, maxBatchSize, schedule }) {
  return function get(id) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `let batchCalls = 0;
const schedule = (fn, ms) => { const id = setTimeout(fn, ms); return id; };
schedule.cancel = (id) => clearTimeout(id);
const get = solution({
  batchFn: async (ids) => { batchCalls++; return ids.map(id => ({id, data:id.toUpperCase()})); },
  delayMs: 50,
  maxBatchSize: 10,
  schedule,
});
const [r1,r2,r3] = await Promise.all([get("a"), get("b"), get("c")]);
console.log(r1.data);
console.log(r2.data);
console.log(batchCalls);`,
        expected: `A\nB\n1`,
        async: true
      }
    ],
    hints: [
      "pending 배열에 {id, resolve, reject}를 모으기",
      "첫 번째 get이 오면 schedule로 flush 예약",
      "maxBatchSize 도달 시 즉시 flush (schedule.cancel로 기존 예약 취소)",
      "flush: pending의 id들로 batchFn 호출, 결과를 id별로 매칭해서 resolve",
      "flush 후 pending 초기화"
    ],
    solution: `function solution({ batchFn, delayMs, maxBatchSize, schedule }) {
  let pending = [];
  let timer = null;
  async function flush() {
    const batch = pending; pending = []; timer = null;
    try {
      const results = await batchFn(batch.map(p => p.id));
      batch.forEach((p, i) => p.resolve(results[i]));
    } catch(e) { batch.forEach(p => p.reject(e)); }
  }
  return function get(id) {
    return new Promise((resolve, reject) => {
      pending.push({id, resolve, reject});
      if (pending.length >= maxBatchSize) {
        if (timer) schedule.cancel(timer);
        flush();
      } else if (!timer) {
        timer = schedule(flush, delayMs);
      }
    });
  };
}`
  },
  {
    id: "async-07",
    category: "async",
    title: "차단기 패턴 (Circuit Breaker)",
    description: `서킷 브레이커 패턴을 구현하세요.

【3가지 상태】
- CLOSED: 정상. 연속 실패 카운트. failureThreshold 도달 시 OPEN 전환.
- OPEN: 모든 요청 즉시 거부 ("circuit open"). resetTimeout 후 HALF_OPEN 전환.
- HALF_OPEN: 테스트 요청 1개 허용. 성공 → CLOSED, 실패 → OPEN.

성공 시 실패 카운터 리셋.`,
    starter: `function solution({ failureThreshold, resetTimeout, now }) {
  return function execute(callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `let time = 0;
const execute = solution({
  failureThreshold: 2,
  resetTimeout: 1000,
  now: () => time,
});
let attempt = 0;
const fail = async () => { attempt++; throw new Error("fail"); };
const ok = async () => "ok";
// 2 failures -> OPEN
try { await execute(fail); } catch(e) {}
try { await execute(fail); } catch(e) {}
// Should be OPEN now
try { await execute(ok); } catch(e) { console.log(e.message); }
// After timeout -> HALF_OPEN -> success -> CLOSED
time = 1000;
const r = await execute(ok);
console.log(r);`,
        expected: `circuit open\nok`,
        async: true
      }
    ],
    hints: [
      "상태: let state = 'CLOSED', failures = 0, openedAt = 0",
      "CLOSED: callAPI 실행. 실패 시 failures++. threshold 도달 시 OPEN 전환",
      "OPEN: now() - openedAt >= resetTimeout이면 HALF_OPEN, 아니면 reject",
      "HALF_OPEN: callAPI 실행. 성공 → CLOSED(failures=0), 실패 → OPEN",
      "성공 시 항상 failures = 0으로 리셋"
    ],
    solution: `function solution({ failureThreshold, resetTimeout, now }) {
  let state = "CLOSED", failures = 0, openedAt = 0;
  return async function execute(callAPI) {
    if (state === "OPEN") {
      if (now() - openedAt >= resetTimeout) state = "HALF_OPEN";
      else throw new Error("circuit open");
    }
    try {
      const result = await callAPI();
      failures = 0; state = "CLOSED";
      return result;
    } catch(e) {
      failures++;
      if (state === "HALF_OPEN" || failures >= failureThreshold) { state = "OPEN"; openedAt = now(); }
      throw e;
    }
  };
}`
  },
  {
    id: "async-08",
    category: "async",
    title: "놓치지 않는 이벤트 (Pub/Sub)",
    description: `비동기 핸들러를 지원하는 이벤트 버스를 구현하세요.

【조건】
- on(event, handler): 핸들러 등록. 해제 함수 반환
- publish(event, data): 모든 핸들러 병렬 실행, 모두 완료까지 대기
- once(event): 다음 발행을 기다리는 Promise 반환
- 핸들러 에러는 다른 핸들러에 영향 없음. 에러들을 배열로 reject`,
    starter: `function solution() {
  return {
    on(event, handler) {},
    publish(event, data) {},
    once(event) {},
  };
}\n`,
    testCases: [
      {
        test: `const bus = solution();
const log = [];
bus.on("msg", async (data) => { log.push("h1:" + data); });
bus.on("msg", async (data) => { log.push("h2:" + data); });
await bus.publish("msg", "hello");
console.log(log.sort().join(","));`,
        expected: `h1:hello,h2:hello`,
        async: true
      },
      {
        test: `const bus = solution();
const p = bus.once("evt");
bus.publish("evt", "data");
const result = await p;
console.log(result);`,
        expected: `data`,
        async: true
      },
      {
        test: `const bus = solution();
const log = [];
const unsub = bus.on("x", async(d)=>log.push(d));
await bus.publish("x", 1);
unsub();
await bus.publish("x", 2);
console.log(log.join(","));`,
        expected: `1`,
        async: true
      }
    ],
    hints: [
      "이벤트별 핸들러 Set을 Map으로 관리",
      "on: 핸들러 추가, () => handlers.delete(handler) 반환",
      "publish: Promise.allSettled로 모든 핸들러 병렬 실행",
      "에러가 있으면 reject(errors), 없으면 resolve",
      "once: on으로 등록 + 한 번 실행 후 자동 해제"
    ],
    solution: `function solution() {
  const handlers = new Map();
  function getHandlers(event) { if (!handlers.has(event)) handlers.set(event, new Set()); return handlers.get(event); }
  return {
    on(event, handler) {
      const hs = getHandlers(event); hs.add(handler);
      return () => hs.delete(handler);
    },
    async publish(event, data) {
      const hs = getHandlers(event);
      const results = await Promise.allSettled([...hs].map(h => h(data)));
      const errors = results.filter(r => r.status === "rejected").map(r => r.reason);
      if (errors.length) throw errors;
    },
    once(event) {
      return new Promise(resolve => {
        const unsub = this.on(event, async (data) => { unsub(); resolve(data); });
      });
    }
  };
}`
  },
  {
    id: "async-09",
    category: "async",
    title: "급한 것 먼저 (Priority Queue)",
    description: `우선순위가 있는 동시성 제한 태스크 풀을 구현하세요.

【조건】
- enqueue(priority, callAPI): 태스크 추가. 낮은 숫자 = 높은 우선순위
- 동시 실행 수 concurrency 제한
- 같은 우선순위는 FIFO
- 실행 중인 태스크는 선점(preempt)되지 않음`,
    starter: `function solution(concurrency) {
  return function enqueue(priority, callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `const enqueue = solution(1);
const order = [];
const task = (id, pri, ms) => enqueue(pri, async () => {
  await new Promise(r => setTimeout(r, ms));
  order.push(id);
  return id;
});
const p1 = task("a", 2, 50);
const p2 = task("b", 0, 10);
const p3 = task("c", 1, 10);
await Promise.all([p1,p2,p3]);
console.log(order.join(","));`,
        expected: `a,b,c`,
        async: true
      }
    ],
    hints: [
      "우선순위 큐: 배열에 넣고 꺼낼 때 priority가 가장 낮은 것을 선택",
      "또는 삽입 시 정렬 유지 (같은 priority면 순서 유지 → stable sort)",
      "running 카운터로 동시 실행 제한",
      "작업 완료 시 큐에서 다음 작업 실행",
      "enqueue는 Promise를 반환, 큐에 resolve/reject 저장"
    ],
    solution: `function solution(concurrency) {
  let running = 0;
  const queue = [];
  let seq = 0;
  function next() {
    if (!queue.length || running >= concurrency) return;
    queue.sort((a, b) => a.priority - b.priority || a.seq - b.seq);
    const item = queue.shift();
    running++;
    item.run();
  }
  return function enqueue(priority, callAPI) {
    return new Promise((resolve, reject) => {
      const s = seq++;
      const run = async () => {
        try { resolve(await callAPI()); } catch(e) { reject(e); }
        finally { running--; next(); }
      };
      queue.push({ priority, seq: s, run });
      if (running < concurrency) next();
    });
  };
}`
  },
  {
    id: "async-10",
    category: "async",
    title: "초당 N개만 (Throttled Queue)",
    description: `고정 윈도우 기반 API 호출 제한을 구현하세요.

【조건】
- windowMs 시간 동안 최대 maxRequests개만 실행
- 초과 요청은 다음 윈도우까지 대기 (FIFO)
- 고정 윈도우: 슬라이딩 아님, 윈도우 시작 시점 기준
- now()와 wait(fn, ms) 함수가 주어짐`,
    starter: `function solution({ maxRequests, windowMs, now, wait }) {
  return function execute(callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `let time = 0;
const delays = [];
const execute = solution({
  maxRequests: 2,
  windowMs: 1000,
  now: () => time,
  wait: async (fn, ms) => { delays.push(ms); time += ms; if(fn)fn(); },
});
const r1 = await execute(async () => "a");
const r2 = await execute(async () => "b");
const r3 = await execute(async () => "c");
console.log(r1);
console.log(r3);
console.log(delays.length > 0);`,
        expected: `a\nc\ntrue`,
        async: true
      }
    ],
    hints: [
      "windowStart와 windowCount를 추적",
      "execute 시 now()가 windowStart + windowMs를 넘었으면 새 윈도우 시작",
      "windowCount < maxRequests면 즉시 실행, count++",
      "아니면 wait(null, 남은 시간)으로 다음 윈도우까지 대기",
      "대기 후 윈도우 리셋하고 실행"
    ],
    solution: `function solution({ maxRequests, windowMs, now, wait }) {
  let windowStart = 0, windowCount = 0;
  const queue = [];
  let processing = false;
  async function process() {
    if (processing) return;
    processing = true;
    while (queue.length) {
      const current = now();
      if (current >= windowStart + windowMs) { windowStart = current; windowCount = 0; }
      if (windowCount < maxRequests) {
        windowCount++;
        const {callAPI, resolve, reject} = queue.shift();
        try { resolve(await callAPI()); } catch(e) { reject(e); }
      } else {
        const remaining = windowStart + windowMs - now();
        await wait(null, remaining);
      }
    }
    processing = false;
  }
  return function execute(callAPI) {
    return new Promise((resolve, reject) => {
      queue.push({callAPI, resolve, reject});
      process();
    });
  };
}`
  },
  {
    id: "async-11",
    category: "async",
    title: "잠금장치 (Async Mutex)",
    description: `키별 비동기 상호 배제 잠금을 구현하세요.

【조건】
- acquire(key): release 함수를 반환하는 Promise
- 같은 key에 대해 한 번에 하나의 작업만 실행
- 대기자는 FIFO 순서
- 다른 key는 독립 (동시 실행 가능)
- release를 두 번 호출해도 안전 (두 번째는 무시)`,
    starter: `function solution() {
  return async function acquire(key) {
    // return release function
  };
}\n`,
    testCases: [
      {
        test: `const acquire = solution();
const order = [];
async function worker(id, key) {
  const release = await acquire(key);
  order.push(id + ":start");
  await new Promise(r => setTimeout(r, 30));
  order.push(id + ":end");
  release();
}
await Promise.all([worker("a","k"), worker("b","k")]);
console.log(order.join(","));`,
        expected: `a:start,a:end,b:start,b:end`,
        async: true
      },
      {
        test: `const acquire = solution();
const order = [];
async function worker(id, key) {
  const release = await acquire(key);
  order.push(id);
  await new Promise(r => setTimeout(r, 10));
  release();
}
await Promise.all([worker("a","k1"), worker("b","k2")]);
console.log(order.sort().join(","));`,
        expected: `a,b`,
        async: true
      }
    ],
    hints: [
      "key별 큐를 Map<key, Queue>로 관리",
      "acquire: 큐가 비어있으면 즉시 resolve, 아니면 큐에 대기",
      "release: 큐에서 다음 대기자를 꺼내서 resolve",
      "이중 release 방지: let released = false; if(released) return;",
      "큐가 비면 Map에서 key 삭제 (메모리 정리)"
    ],
    solution: `function solution() {
  const locks = new Map();
  return async function acquire(key) {
    if (!locks.has(key)) locks.set(key, []);
    const queue = locks.get(key);
    const p = new Promise(resolve => queue.push(resolve));
    if (queue.length === 1) queue[0](makeRelease(key));
    else return p;
    return p;
    function makeRelease(key) {
      let released = false;
      return () => {
        if (released) return;
        released = true;
        const q = locks.get(key);
        q.shift();
        if (q.length) q[0](makeRelease(key));
        else locks.delete(key);
      };
    }
  };
}`
  },
  {
    id: "async-12",
    category: "async",
    title: "일단 보여주고 갱신 (SWR Cache)",
    description: `stale-while-revalidate 캐시 전략을 구현하세요.

【조건】
- maxAge 이내: 캐시 반환 (API 호출 안 함)
- maxAge ~ staleAge: 캐시 즉시 반환 + 백그라운드에서 갱신
- staleAge 초과: 캐시 미스 (API 호출 후 반환)
- 백그라운드 갱신은 중복 실행 방지 (dedup)
- 백그라운드 갱신 실패 시 기존 캐시 유지`,
    starter: `function solution({ maxAge, staleAge, now }) {
  return function get(key, callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `let time = 0;
let calls = 0;
const get = solution({maxAge:100, staleAge:500, now:()=>time});
// First call - cache miss
const r1 = await get("k", async () => { calls++; return "v1"; });
console.log(r1);
// Within maxAge - cache hit
const r2 = await get("k", async () => { calls++; return "v2"; });
console.log(r2);
console.log(calls);`,
        expected: `v1\nv1\n1`,
        async: true
      },
      {
        test: `let time = 0;
let calls = 0;
const get = solution({maxAge:100, staleAge:500, now:()=>time});
await get("k", async () => { calls++; return "v1"; });
// Stale period - returns cache, revalidates in background
time = 200;
const r = await get("k", async () => { calls++; return "v2"; });
console.log(r);
console.log(calls);`,
        expected: `v1\n2`,
        async: true
      }
    ],
    hints: [
      "캐시: Map<key, {value, timestamp}>",
      "get 시 now() - timestamp으로 신선도 판단",
      "maxAge 이내: 캐시 직접 반환",
      "stale: 캐시 반환 + callAPI().then(result => cache.set(key, {value: result, timestamp: now()}))",
      "revalidating Map으로 백그라운드 갱신 중복 방지"
    ],
    solution: `function solution({ maxAge, staleAge, now }) {
  const cache = new Map();
  const revalidating = new Set();
  return async function get(key, callAPI) {
    const entry = cache.get(key);
    if (entry) {
      const age = now() - entry.timestamp;
      if (age <= maxAge) return entry.value;
      if (age <= staleAge) {
        if (!revalidating.has(key)) {
          revalidating.add(key);
          callAPI().then(val => { cache.set(key, {value:val, timestamp:now()}); }).catch(()=>{}).finally(() => revalidating.delete(key));
        }
        return entry.value;
      }
    }
    const value = await callAPI();
    cache.set(key, {value, timestamp: now()});
    return value;
  };
}`
  },
  {
    id: "async-13",
    category: "async",
    title: "낙관적으로 먼저 반영 (Optimistic Update)",
    description: `낙관적 UI 업데이트를 관리합니다.

【조건】
- execute(optimisticValue, callAPI): 즉시 optimisticValue로 UI 업데이트
- 서버 응답 성공 시 서버 값으로 확정
- 서버 응답 실패 시 마지막 확정값으로 롤백
- 빠른 클릭 처리: 이전 요청 중 새 요청이 오면 이전 것의 콜백은 무시
- onUpdate(value): UI 업데이트 콜백
- onRollback(value): 롤백 콜백`,
    starter: `function solution({ onUpdate, onRollback, initialValue }) {
  return function execute(optimisticValue, callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `const updates = [];
const rollbacks = [];
const execute = solution({
  onUpdate: v => updates.push(v),
  onRollback: v => rollbacks.push(v),
  initialValue: 0,
});
await execute(1, async () => 1);
console.log(updates.join(","));
console.log(rollbacks.length);`,
        expected: `1,1\n0`,
        async: true
      },
      {
        test: `const updates = [];
const rollbacks = [];
const execute = solution({
  onUpdate: v => updates.push("u:"+v),
  onRollback: v => rollbacks.push("r:"+v),
  initialValue: 0,
});
try {
  await execute(1, async () => { throw new Error("fail"); });
} catch(e) {}
console.log(updates.join(","));
console.log(rollbacks.join(","));`,
        expected: `u:1\nr:0`,
        async: true
      }
    ],
    hints: [
      "confirmedValue를 추적: 서버가 확인한 마지막 값",
      "requestId 카운터로 최신 요청 식별",
      "execute: 즉시 onUpdate(optimisticValue), callAPI 호출",
      "성공 시: id가 최신이면 confirmedValue = serverValue, onUpdate(serverValue)",
      "실패 시: id가 최신이면 onRollback(confirmedValue)"
    ],
    solution: `function solution({ onUpdate, onRollback, initialValue }) {
  let confirmed = initialValue;
  let currentId = 0;
  return async function execute(optimisticValue, callAPI) {
    const id = ++currentId;
    onUpdate(optimisticValue);
    try {
      const serverValue = await callAPI();
      if (id === currentId) { confirmed = serverValue; onUpdate(serverValue); }
      return serverValue;
    } catch(e) {
      if (id === currentId) onRollback(confirmed);
      throw e;
    }
  };
}`
  },
  {
    id: "async-14",
    category: "async",
    title: "똑똑한 폴링 (Adaptive Polling)",
    description: `변화에 반응하는 적응형 폴링을 구현하세요.

【조건】
- 변화 감지 시 interval을 minInterval로 리셋
- 변화 없으면 interval을 2배로 (maxInterval까지)
- 실패 시에도 interval 2배
- 이전 폴링이 완료되어야 다음 폴링 시작 (직렬)
- start() / stop() 으로 제어
- wait(fn, ms) 함수 사용`,
    starter: `function solution({ callAPI, onChange, minInterval, maxInterval, wait }) {
  return {
    start() {},
    stop() {},
  };
}\n`,
    testCases: [
      {
        test: `const results = [];
let callIdx = 0;
const responses = ["building", "building", "deploying"];
let time = 0;
const intervals = [];
const poller = solution({
  callAPI: async () => responses[callIdx++],
  onChange: (cur, prev) => results.push(cur),
  minInterval: 100,
  maxInterval: 1600,
  wait: async (fn, ms) => { intervals.push(ms); if(fn)fn(); },
});
poller.start();
// Process 3 polls
await new Promise(r => setTimeout(r, 100));
poller.stop();
console.log(results.length > 0);
console.log(intervals[1] > intervals[0] || intervals[1] === intervals[0]);`,
        expected: `true\ntrue`,
        async: true
      }
    ],
    hints: [
      "let interval = minInterval, prevResult = undefined, running = false",
      "start: running = true, 루프 시작",
      "루프: callAPI() 호출 → 결과 비교 → onChange 호출 → interval 조정 → wait",
      "변화 감지: JSON.stringify(cur) !== JSON.stringify(prev)",
      "stop: running = false로 설정해서 루프 종료"
    ],
    solution: `function solution({ callAPI, onChange, minInterval, maxInterval, wait }) {
  let running = false, interval = minInterval, prevResult = undefined;
  return {
    async start() {
      running = true;
      while (running) {
        try {
          const result = await callAPI();
          if (JSON.stringify(result) !== JSON.stringify(prevResult)) {
            onChange(result, prevResult);
            interval = minInterval;
          } else {
            interval = Math.min(interval * 2, maxInterval);
          }
          prevResult = result;
        } catch(e) {
          interval = Math.min(interval * 2, maxInterval);
        }
        if (running) await wait(null, interval);
      }
    },
    stop() { running = false; }
  };
}`
  },
  {
    id: "async-15",
    category: "async",
    title: "순서 보장 큐 (Ordered Queue)",
    description: `메시지 전송 순서를 보장하는 큐를 구현하세요.

【조건】
- send(message, callAPI): 메시지 전송. FIFO 순서 보장
- 이전 메시지가 완료되어야 다음 전송 시작
- 실패 시 onError 콜백 호출하고 다음 메시지로 진행 (큐 블록 안 됨)
- 각 send는 성공 시 결과를 resolve, 실패 시 reject`,
    starter: `function solution({ onError }) {
  return function send(message, callAPI) {
    // 구현
  };
}\n`,
    testCases: [
      {
        test: `const errors = [];
const order = [];
const send = solution({ onError: e => errors.push(e.message) });
const p1 = send("a", async () => { order.push("a"); return "A"; });
const p2 = send("b", async () => { throw new Error("fail"); });
const p3 = send("c", async () => { order.push("c"); return "C"; });
const r1 = await p1;
try { await p2; } catch(e) {}
const r3 = await p3;
console.log(r1);
console.log(r3);
console.log(order.join(","));
console.log(errors.join(","));`,
        expected: `A\nC\na,c\nfail`,
        async: true
      }
    ],
    hints: [
      "let chain = Promise.resolve(); 로 체인 관리",
      "send: chain = chain.then(() => callAPI())",
      "각 send의 결과를 별도 Promise로 반환",
      "실패 시 onError 호출하고 체인은 계속 진행",
      "chain.then 안에서 try-catch로 에러 처리, reject는 개별 Promise로"
    ],
    solution: `function solution({ onError }) {
  let chain = Promise.resolve();
  return function send(message, callAPI) {
    return new Promise((resolve, reject) => {
      chain = chain.then(async () => {
        try {
          const result = await callAPI();
          resolve(result);
        } catch(e) {
          onError(e);
          reject(e);
        }
      });
    });
  };
}`
  },
];
