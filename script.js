const API_URL = 'https://restcountries.com/v3.1';

// Función para mostrar estado
function mostrarEstado(mensaje, tipo) {
  const status = document.getElementById('status');
  status.textContent = mensaje;
  status.className = `status ${tipo}`;
}

// Función principal para obtener datos
async function obtenerDatos(endpoint) {
  try {
    mostrarEstado('Cargando...', 'loading');
    document.getElementById('results').innerHTML = '';

    const respuesta = await fetch(`${API_URL}${endpoint}`);

    if (!respuesta.ok) {
      throw new Error('Error al obtener datos');
    }

    const datos = await respuesta.json();

    mostrarEstado(`Datos obtenidos: ${Array.isArray(datos) ? datos.length : 1} elemento(s)`, 'success');
    mostrarDatos(datos);

  } catch (error) {
    mostrarEstado('Error: ' + error.message, 'error');
    console.error(error);
  }
}

// Mostrar datos de países
function mostrarDatos(datos) {
  const container = document.getElementById('results');

  if (Array.isArray(datos)) {
    datos.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';

      let html = '';
      if (item.name) {
        html += `<h3>${item.name.common}</h3>`;
      }
      if (item.capital) {
        html += `<p><strong>Capital:</strong> ${item.capital[0]}</p>`;
      }
      if (item.population) {
        html += `<p><strong>Población:</strong> ${item.population.toLocaleString()} habitantes</p>`;
      }
      if (item.region) {
        html += `<p><strong>Región:</strong> ${item.region}</p>`;
      }
      if (item.flags) {
        html += `<p><img src="${item.flags.png}" alt="Bandera" style="max-width: 100px; border: 1px solid #ddd;"></p>`;
      }

      div.innerHTML = html;
      container.appendChild(div);
    });
  } else {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<h3>${datos.name.common}</h3>
                    <p><strong>Capital:</strong> ${datos.capital[0]}</p>
                    <p><strong>Población:</strong> ${datos.population.toLocaleString()}</p>
                    <img src="${datos.flags.png}" alt="Bandera" style="max-width: 100px;">`;
    container.appendChild(div);
  }
}

// Funciones para cada botón
function obtenerPosts() {
  obtenerDatos('/region/americas');
}

function obtenerUsuarios() {
  obtenerDatos('/region/europe');
}

function obtenerAlbumes() {
  obtenerDatos('/region/asia');
}

function obtenerTodos() {
  obtenerDatos('/region/africa');
}
