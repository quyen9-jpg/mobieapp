// 👉 Test mặc định
let currentTest = 1;

let questions = [];
let currentPage = 1;
const perPage = 12;
let score = 0;

// 👉 Lưu đáp án user
let userAnswers = [];

// 👉 Load JSON
function loadTest(testNumber) {
  const url = `data/N1_goi/test${testNumber}.json`;

  questions = [];
  currentPage = 1;
  score = 0;
  userAnswers = [];

  const container = document.getElementById("options");
  const scoreEl = document.getElementById("score");
  const pagination = document.getElementById("pagination");

  if (container) container.innerHTML = "<p>Đang tải...</p>";
  if (pagination) pagination.innerHTML = "";
  if (scoreEl) scoreEl.innerText = 0;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Lỗi load file");
      return res.json();
    })
    .then(data => {
      questions = data;
      showPage();
      renderPagination();
      updateProgress();
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p style='color:red'>❌ Lỗi load JSON</p>";
    });
}

// 👉 Hiển thị câu hỏi
// 👉 Hiển thị câu hỏi (Đã lược bỏ dòng "Chọn cách dùng đúng...")
function showPage() {
  if (!questions.length) return;

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const container = document.getElementById("options");
  container.innerHTML = "";

  const pageQuestions = questions.slice(start, end);

  pageQuestions.forEach((q, index) => {
    if (!Array.isArray(q.options) || q.answer == null) return;

    const realIndex = start + index;
    const div = document.createElement("div");
    div.className = "question-box";

    // 👉 SỬA TẠI ĐÂY: Chỉ hiển thị số câu và từ khóa
    const question = document.createElement("p");
    question.innerHTML = `
       <b>Câu ${realIndex + 1}:</b> 
         ${q.question} 
         ${q.reading ? `<span class="reading">(${q.reading})</span>` : ""}
      `;
    // Nếu bạn muốn hiện cả Reading thì dùng: ${q.question} (${q.reading || ''})

    const translation = document.createElement("p");
    translation.className = "translation hidden";
    translation.innerText = q.translation || "";

    const optDiv = document.createElement("div");
    optDiv.className = "options-grid";

    const explain = document.createElement("div");
    explain.className = "explain hidden";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerText = typeof opt === "object" ? opt.text : opt;

      btn.onclick = () => {
        if (userAnswers[realIndex] !== undefined) return;
        userAnswers[realIndex] = i;

        const allBtns = optDiv.querySelectorAll("button");
        allBtns.forEach((b, idx) => {
          b.disabled = true;
          if (idx === q.answer) b.classList.add("correct");
          if (idx === i && i !== q.answer) b.classList.add("wrong");
        });

        if (i === q.answer) {
          score++;
          document.getElementById("score").innerText = score;
        }

        translation.classList.remove("hidden");

        // Hiển thị giải thích của đáp án vừa bấm
        if (typeof q.options[0] === "object") {
          explain.innerHTML = q.options.map((o, idx) => `
           <div style="margin-bottom:8px">
            <b>${idx + 1}.</b> ${o.text}<br>
             ${o.translation || ""}<br>
             ${o.explanation || ""}
          </div>
         `).join("");
        } else {
          explain.innerHTML = `<p>${q.explanation || ""}</p>`;
       }
        explain.classList.remove("hidden");
        updateProgress();
      };

      optDiv.appendChild(btn);
    });

    // Phần restore (giữ nguyên logic hiển thị giải thích khi chuyển trang)
    if (userAnswers[realIndex] !== undefined) {
      const selected = userAnswers[realIndex];
      setTimeout(() => {
        const allBtns = optDiv.querySelectorAll("button");
        allBtns.forEach((b, idx) => {
          b.disabled = true;
          if (idx === q.answer) b.classList.add("correct");
          if (idx === selected && selected !== q.answer) b.classList.add("wrong");
        });

        translation.classList.remove("hidden");
        const opt = q.options[selected];
        if (typeof q.options[0] === "object") {
           explain.innerHTML = q.options.map((o, idx) => `
            <div style="margin-bottom:8px">
            <b>${idx + 1}.</b> ${o.text}<br>
            <b style="color:${idx === q.answer ? 'green' : ''}">
              ${idx + 1}.
            </b>
             ${o.translation || ""}<br>
             ${o.explanation || ""}
            </div>
         `).join("");
        } else {
             explain.innerHTML = `<p>${q.explanation || ""}</p>`;
        }
        explain.classList.remove("hidden");
      }, 0);
    }

    div.appendChild(question);
    div.appendChild(translation);
    div.appendChild(optDiv);
    div.appendChild(explain);
    container.appendChild(div);
  });
}
// 👉 Pagination
function renderPagination() {
  const totalPages = Math.ceil(questions.length / perPage);
  const container = document.getElementById("pagination");

  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = "page-btn";

    if (i === currentPage) btn.classList.add("active");

    btn.onclick = () => {
      currentPage = i;
      showPage();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    container.appendChild(btn);
  }
}

// 👉 Progress
function updateProgress() {
  const progressEl = document.getElementById("progress");
  if (!progressEl) return;

  const done = userAnswers.filter(a => a !== undefined).length;
  progressEl.innerText = `${done}/${questions.length}`;
}

// 👉 Chọn test
function selectTest(testNumber, btn) {
  currentTest = testNumber;
  loadTest(testNumber);

  document.querySelectorAll(".test-btn").forEach(b => {
    b.classList.remove("active");
  });

  if (btn) btn.classList.add("active");
}

// 👉 Load lần đầu
window.onload = () => {
  loadTest(currentTest);
};