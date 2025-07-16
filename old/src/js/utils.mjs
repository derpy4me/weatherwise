export function setSessionStorage(key, item) {
  sessionStorage.setItem(key, JSON.stringify(item));
}

export function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}


export function setSessionCache(key, data, ttl = 60) {
  let now = new Date();
  now.setSeconds(now.getSeconds() + ttl);
  const cacheData = {...data, ttl: now};
  setSessionStorage(key, cacheData);
}

export function getSessionCache(key) {
  const data = getSessionStorage(key);
  if (!data) {
    return null;
  }
  if ("ttl" in data) {
    let now = new Date();
    if (data.ttl <= now) {
      sessionStorage.removeItem(key);
      return null;
    }
  }

  return data;

}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  callback,
  data,
  position = "beforeend",
  clear = true
) {
  if (clear) {
    if (parentElement) {
      parentElement.innerHTML = "";
    }
  }

  const template = await templateFn();
  if (parentElement) {
    parentElement.insertAdjacentHTML(position, template);
  }
  if (callback) {
    callback(data);
  }
}

export async function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "beforeend",
  clear = true
) {
  if (clear) {
    if (parentElement) {
      parentElement.innerHTML = "";
    }
  }
  list.map(async (item) => {
    const templateItem = await templateFn(item);
    if (parentElement) {
      parentElement.insertAdjacentHTML(position, templateItem);
    }
  });
}

export function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      return await res.text();
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const header = document.querySelector("#mainHeader");
  const footer = document.querySelector("#mainFooter");
  renderWithTemplate(headerTemplateFn, header, null, null, "beforeend", false);
  renderWithTemplate(footerTemplateFn, footer);
}

export function getWeatherIconUrl(iconId, size = "") {
  return `https://openweathermap.org/img/wn/${iconId}${size}.png`;
}

export async function generateHash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
