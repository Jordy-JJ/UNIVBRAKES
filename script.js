const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

const floatToggle = document.getElementById('floatToggle');
const floatOptions = document.getElementById('floatOptions');
floatToggle?.addEventListener('click', () => floatOptions.classList.toggle('open'));

document.addEventListener('click', (event) => {
  if (!event.target.closest('.floating-contact')) {
    floatOptions?.classList.remove('open');
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-grid article').forEach((card) => {
      const shouldShow = filter === 'todos' || card.dataset.category === filter;
      card.style.display = shouldShow ? 'block' : 'none';
    });
  });
});

const modal = document.getElementById('modal');
const modalImg = modal?.querySelector('img');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let activeGalleryIndex = 0;

function setActiveGallery(index) {
  if (!galleryItems.length) return;
  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  galleryItems.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === activeGalleryIndex));
  galleryItems[activeGalleryIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function openModalFromImage(image) {
  if (!modal || !modalImg) return;
  modalImg.src = image.src;
  modalImg.alt = image.alt;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    setActiveGallery(index);
    const image = item.querySelector('img');
    if (image) openModalFromImage(image);
  });
});

document.getElementById('prevImage')?.addEventListener('click', () => setActiveGallery(activeGalleryIndex - 1));
document.getElementById('nextImage')?.addEventListener('click', () => setActiveGallery(activeGalleryIndex + 1));

document.querySelector('.modal-close')?.addEventListener('click', () => {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
});
modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
  }
});

document.querySelectorAll('.accordion-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    document.querySelectorAll('.accordion-item').forEach((other) => {
      if (other !== item) other.classList.remove('open');
    });
    item?.classList.toggle('open');
  });
});

const branchData = {
  portales: {
    title: 'Sucursal Portales',
    address: 'Bulgaria 128 Bis, Col. Portales, Benito Juárez, CDMX, C.P. 03300.',
    mapSrc: 'https://www.google.com/maps?q=Bulgaria%20128%20Bis%20Portales%20Benito%20Ju%C3%A1rez%20CDMX&output=embed',
    routeUrl: 'https://www.google.com/maps/search/?api=1&query=Bulgaria%20128%20Bis%20Portales%20Benito%20Ju%C3%A1rez%20CDMX',
    whatsapp: 'https://wa.me/5215579882997?text=Hola%20UNIVBRAKES%20Portales,%20quiero%20cotizar',
    hours: 'Lunes a viernes 9:00–18:00 · Sábado 9:00–15:00 · Domingo y días festivos cerrado.'
  },
  coapa: {
    title: 'Sucursal Coapa',
    address: 'Viaducto Tlalpan 3334, Coapa, Ejido Viejo de Santa Úrsula, CDMX.',
    mapSrc: 'https://www.google.com/maps?q=Viaducto%20Tlalpan%203334%20Coapa%20Ejido%20Viejo%20de%20Santa%20%C3%9Arsula%20CDMX&output=embed',
    routeUrl: 'https://www.google.com/maps/search/?api=1&query=Viaducto%20Tlalpan%203334%20Coapa%20Ejido%20Viejo%20de%20Santa%20%C3%9Arsula%20CDMX',
    whatsapp: 'https://wa.me/5215554934176?text=Hola%20UNIVBRAKES%20Coapa,%20quiero%20cotizar',
    hours: 'Lunes a viernes 9:00–18:00 · Sábado 9:00–15:00 · Domingo y días festivos cerrado.'
  }
};

const tabs = document.querySelectorAll('.branch-tab');
const panels = document.querySelectorAll('.branch-panel');
const mapOptions = document.querySelectorAll('.map-option');
const mapBranchTitle = document.getElementById('mapBranchTitle');
const mapBranchAddress = document.getElementById('mapBranchAddress');
const mapBranchHours = document.getElementById('mapBranchHours');
const miniMapFrame = document.getElementById('miniMapFrame');
const mapRouteBtn = document.getElementById('mapRouteBtn');
const mapWhatsappBtn = document.getElementById('mapWhatsappBtn');
const copyMapAddress = document.getElementById('copyMapAddress');
const copyToast = document.getElementById('copyToast');
let activeBranch = 'portales';

function activateBranch(branch) {
  const data = branchData[branch] || branchData.portales;
  activeBranch = branchData[branch] ? branch : 'portales';

  tabs.forEach((item) => {
    const isActive = item.dataset.branch === activeBranch;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', String(isActive));
  });
  panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.branch === activeBranch));
  mapOptions.forEach((option) => option.classList.toggle('active', option.dataset.branch === activeBranch));

  if (mapBranchTitle) mapBranchTitle.textContent = data.title;
  if (mapBranchAddress) mapBranchAddress.textContent = data.address;
  if (mapBranchHours) mapBranchHours.innerHTML = `<strong>Horario:</strong> ${data.hours}`;
  if (miniMapFrame) {
    miniMapFrame.src = data.mapSrc;
    miniMapFrame.title = `Mapa interactivo UNIVBRAKES ${data.title.replace('Sucursal ', '')}`;
  }
  if (mapRouteBtn) mapRouteBtn.href = data.routeUrl;
  if (mapWhatsappBtn) mapWhatsappBtn.href = data.whatsapp;
}

tabs.forEach((tab) => tab.addEventListener('click', () => activateBranch(tab.dataset.branch)));
mapOptions.forEach((button) => button.addEventListener('click', () => activateBranch(button.dataset.branch)));

copyMapAddress?.addEventListener('click', async () => {
  const address = branchData[activeBranch]?.address || branchData.portales.address;
  try {
    await navigator.clipboard.writeText(address);
  } catch (error) {
    const field = document.createElement('textarea');
    field.value = address;
    field.setAttribute('readonly', '');
    field.style.position = 'absolute';
    field.style.left = '-9999px';
    document.body.appendChild(field);
    field.select();
    document.execCommand('copy');
    document.body.removeChild(field);
  }
  if (copyToast) {
    copyToast.textContent = `Dirección copiada: ${address}`;
    copyToast.classList.add('show');
    setTimeout(() => copyToast.classList.remove('show'), 2600);
  }
});

function getMexicoCityNowParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(date);
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function getMexicanHolidayName(values) {
  const year = Number(values.year);
  const month = Number(values.month);
  const dayOfMonth = Number(values.day);
  const weekday = values.weekday;
  const isMonday = weekday === 'Mon';

  const firstMonday = (monthNumber) => {
    const firstDay = new Date(Date.UTC(year, monthNumber - 1, 1));
    const utcDay = firstDay.getUTCDay();
    return 1 + ((8 - utcDay) % 7);
  };
  const thirdMonday = (monthNumber) => firstMonday(monthNumber) + 14;

  if (month === 1 && dayOfMonth === 1) return 'Año Nuevo';
  if (month === 2 && isMonday && dayOfMonth === firstMonday(2)) return 'Día de la Constitución';
  if (month === 3 && isMonday && dayOfMonth === thirdMonday(3)) return 'Natalicio de Benito Juárez';
  if (month === 5 && dayOfMonth === 1) return 'Día del Trabajo';
  if (month === 9 && dayOfMonth === 16) return 'Día de la Independencia';
  if (month === 11 && isMonday && dayOfMonth === thirdMonday(11)) return 'Día de la Revolución Mexicana';
  if (month === 12 && dayOfMonth === 25) return 'Navidad';
  return '';
}

function updateOpenStatus() {
  const values = getMexicoCityNowParts();
  const day = values.weekday;
  const hour = Number(values.hour === '24' ? '0' : values.hour);
  const minute = Number(values.minute);
  const totalMinutes = hour * 60 + minute;
  const holidayName = getMexicanHolidayName(values);
  const isWeekday = ['Mon','Tue','Wed','Thu','Fri'].includes(day);
  const isSaturday = day === 'Sat';
  const withinHours = (isWeekday && totalMinutes >= 9 * 60 && totalMinutes < 18 * 60) || (isSaturday && totalMinutes >= 9 * 60 && totalMinutes < 15 * 60);
  const isOpen = !holidayName && withinHours;
  const label = holidayName ? `Cerrado por día festivo: ${holidayName}` : (isOpen ? 'Abierto ahora' : 'Cerrado ahora');
  document.querySelectorAll('[data-status]').forEach((status) => {
    status.textContent = label;
    status.classList.toggle('open', isOpen);
    status.classList.toggle('closed', !isOpen);
  });
}
updateOpenStatus();
setInterval(updateOpenStatus, 60000);

function sendWhatsApp({ phone, part, car, serial, notes }) {
  const serialText = serial ? ` Número de serie: ${serial}.` : '';
  const message = `Hola UNIVBRAKES, quiero cotizar ${part} para ${car}.${serialText}${notes ? ` Comentarios: ${notes}` : ''}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

document.getElementById('quoteForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const phone = document.getElementById('branch').value;
  const part = document.getElementById('part').value;
  const car = document.getElementById('car').value.trim();
  const serial = document.getElementById('serial')?.value.trim() || '';
  const notes = document.getElementById('notes').value.trim();
  if (!car) return;
  sendWhatsApp({ phone, part, car, serial, notes });
});

document.querySelectorAll('.quote-product').forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.closest('article')?.dataset.product || 'refacciones de frenos';
    const select = document.getElementById('part');
    if (select) {
      const matchingOption = Array.from(select.options).find((option) => product.toLowerCase().includes(option.text.toLowerCase()) || option.text.toLowerCase().includes(product.toLowerCase()));
      if (matchingOption) select.value = matchingOption.text;
    }
    document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('car')?.focus(), 650);
  });
});

const uploadForm = document.getElementById('uploadForm');
const uploadPreview = document.getElementById('uploadPreview');
const uploadResult = document.getElementById('uploadResult');
const uploadWhatsapp = document.getElementById('uploadWhatsapp');
const uploadInputs = Array.from(document.querySelectorAll('[data-file-input]'));
let previewObjectUrls = [];

function selectedUploadFiles() {
  return uploadInputs.flatMap((input) => Array.from(input.files || []).filter((file) => file.type.startsWith('image/')));
}

function setUploadResult(message, type = '') {
  if (!uploadResult) return;
  uploadResult.textContent = message;
  uploadResult.className = `upload-result ${type}`.trim();
}

function renderUploadPreview() {
  if (!uploadPreview) return;
  previewObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  previewObjectUrls = [];
  const files = selectedUploadFiles();
  uploadPreview.innerHTML = '';

  if (!files.length) {
    uploadPreview.innerHTML = '<p class="empty-state">Todavía no has seleccionado imágenes.</p>';
    return;
  }

  files.forEach((file, index) => {
    const url = URL.createObjectURL(file);
    previewObjectUrls.push(url);
    const figure = document.createElement('figure');
    figure.className = 'preview-card';
    figure.innerHTML = `
      <img src="${url}" alt="Vista previa ${index + 1}: ${file.name}">
      <figcaption>${file.name}</figcaption>
    `;
    uploadPreview.appendChild(figure);
  });
}

uploadInputs.forEach((input) => input.addEventListener('change', renderUploadPreview));

function buildUploadWhatsAppMessage() {
  const branchSelect = document.getElementById('uploadBranch');
  const selectedOption = branchSelect?.selectedOptions?.[0];
  const branchName = selectedOption?.dataset.name || 'Portales';
  const phone = branchSelect?.value || '5215579882997';
  const user = document.getElementById('uploadUser')?.value.trim() || 'cliente';
  const contact = document.getElementById('uploadPhone')?.value.trim() || 'sin teléfono escrito';
  const vehicle = document.getElementById('uploadVehicle')?.value.trim() || 'vehículo/producto por confirmar';
  const serial = document.getElementById('uploadSerial')?.value.trim();
  const notes = document.getElementById('uploadNotes')?.value.trim();
  const fileCount = selectedUploadFiles().length;
  const serialText = serial ? ` Número de serie: ${serial}.` : '';
  const message = `Hola UNIVBRAKES ${branchName}, soy ${user}. Subí ${fileCount} foto(s) desde la página para cotizar: ${vehicle}.${serialText} Mi WhatsApp es ${contact}.${notes ? ` Comentarios: ${notes}.` : ''} ¿Me pueden apoyar con disponibilidad y precio?`;
  return { phone, message };
}

uploadWhatsapp?.addEventListener('click', () => {
  const files = selectedUploadFiles();
  if (!files.length) {
    setUploadResult('Selecciona al menos una foto antes de enviar el resumen por WhatsApp.', 'warning');
    return;
  }
  const { phone, message } = buildUploadWhatsAppMessage();
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

uploadForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const files = selectedUploadFiles();
  if (!files.length) {
    setUploadResult('Selecciona al menos una foto para completar la solicitud.', 'warning');
    return;
  }

  const submitButton = uploadForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setUploadResult('Subiendo imágenes...', 'loading');

  try {
    const response = await fetch('/', {
      method: 'POST',
      body: new FormData(uploadForm)
    });
    if (!response.ok) throw new Error('No se pudo enviar el formulario');
    setUploadResult('Listo. Las imágenes fueron enviadas. También puedes tocar “Enviar resumen por WhatsApp” para avisar a la sucursal.', 'success');
  } catch (error) {
    setUploadResult('Vista local: las imágenes se previsualizan aquí. Para guardarlas de verdad, publica la página en Netlify con Forms activo. Mientras tanto, usa el botón de WhatsApp para enviar el resumen.', 'warning');
  } finally {
    submitButton.disabled = false;
  }
});

