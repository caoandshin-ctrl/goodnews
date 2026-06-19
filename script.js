// DOM
const titleInput = document.getElementById('titleInput');
const verseInput = document.getElementById('verseInput');
const bodyInput = document.getElementById('bodyInput');
const styleSelect = document.getElementById('styleSelect');

const previewBtn = document.getElementById('previewBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const printBtn = document.getElementById('printBtn');
const clearBtn = document.getElementById('clearBtn');

const pvTitle = document.getElementById('pvTitle');
const pvVerse = document.getElementById('pvVerse');
const pvBody = document.getElementById('pvBody');
const tractPreview = document.getElementById('tractPreview');

// Fill default example
titleInput.value = '하나님의 사랑을 전합니다';
verseInput.value = '요한복음 3:16';
bodyInput.value = '하나님은 세상을 이처럼 사랑하사 독생자를 주셨으니... (본문을 여기에 적으세요.)';

// Functions
function updatePreview(){
  pvTitle.textContent = titleInput.value || '전도지 제목';
  pvVerse.textContent = verseInput.value || '';
  pvBody.textContent = bodyInput.value || '여기에 전도지 내용이 표시됩니다.';
  // style
  tractPreview.className = 'tract ' + (styleSelect.value || 'classic');
}

// Print / PDF
function printTract(){
  // Open print dialog for the tract only by temporarily hiding other elements via CSS class
  window.print();
}

function downloadPdf(){
  // Use html2pdf to export the preview element
  const opt = {
    margin:       10,
    filename:     (titleInput.value || 'tract') + '.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  // Clone and scale to A4 width: ensure content centered on A4
  html2pdf().set(opt).from(tractPreview).save();
}

// Events
previewBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  updatePreview();
  // scroll to preview
  tractPreview.scrollIntoView({behavior:'smooth'});
});

printBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  updatePreview();
  printTract();
});

downloadPdfBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  updatePreview();
  downloadPdf();
});

clearBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  titleInput.value = '';
  verseInput.value = '';
  bodyInput.value = '';
  styleSelect.value = 'classic';
  updatePreview();
});

// Live preview while typing (optional)
[titleInput, verseInput, bodyInput, styleSelect].forEach(el=>{
  el.addEventListener('input', ()=> updatePreview());
});

// Initialize
updatePreview();
