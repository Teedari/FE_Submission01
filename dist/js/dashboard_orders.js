import Api from "./models/Api.js";
import { element } from "./helpers.js";
import PersistentData from "./models/PersistentData.js";

const api = new Api(axios);
let data = {};
let search = "";
let currentPage = 1;

const populateTableData = (parent, data = []) => {
  const tableData = data.map((dt) => {
    const status = dt?.status.toLowerCase();
    let html = `
  <tr>
    <td>${dt?.product?.name}</td>
    <td></td>
    <td></td>
  `;
    html +=
      status === "processing"
        ? `<td class="text-danger">${dt?.status}</td>`
        : status === "delivered"
        ? `<td class="text-success">${dt?.status}</td>`
        : `<td>${dt?.status}</td>`;
    html += "</tr>";
    return html;
  });
  parent.innerHTML = tableData.toString().replaceAll(',', ' ');
};

const paginator = (page, total) => {
  const prevElement = element("#prev-page");
  const nextElement = element("#next-page");
  const pageStatutElement = element("#page-status");
  if (page === 1) {
    prevElement.style.display = "none";
  } else {
    prevElement.style.display = "inline";
    prevElement.setAttribute("data-page-number", page - 1);
  }
  if (page >= total) {
    nextElement.style.display = "none";
  } else {
    nextElement.style.display = "inline";
    nextElement.setAttribute("data-page-number", page + 1);
  }

  pageStatutElement.textContent = `${currentPage} of ${total}`;
};

const fetchOrders = () => {
  console.log(currentPage);
  let endpoint = `/orders?page=${currentPage}`;
  endpoint += (search.trim() !== "" ? `&q=${search.trim()}` : "").trim();
  console.log(endpoint);
  const token = PersistentData.getUser(api);
  api
    .token(token["access_token"])
    .get(endpoint)
    .then((response) => {
      data = { ...response.data };

      populateTableData(element("#orders-tbody"), data?.orders);

      paginator(data?.page, data?.total);
    });
};

const paginatorBtnHandler = function (e) {
  currentPage = this.getAttribute("data-page-number");
  fetchOrders(search);
};

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const searchOrdersHandler = (e) => {
  search = e.target.value;
  if (search.trim() === "") {
    currentPage = 1;
  }
  fetchOrders();
};

// events
element("#prev-page").onclick = paginatorBtnHandler;
element("#next-page").onclick = paginatorBtnHandler;
element("#search-input").onkeyup = debounce(searchOrdersHandler);

// This function is invoke when script is loaded
fetchOrders();
