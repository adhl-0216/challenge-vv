document.addEventListener("DOMContentLoaded", () => {
  let formRegister = document.getElementById("form-register");

  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formRegister);
    const creds = {};
    formData.forEach((value, key) => {
      creds[key] = value;
    });

    if (creds.password == creds.password_confirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(creds.email, creds.password)
        .then((res) => {
          console.log(res.user);
        })
        .catch((res) => {
          showToast(res.message, "ERROR");
        });
    } else {
      showToast("Passwords must be the same", "ERROR");
    }
  });
});

function showToast(message, variant) {
  let icon = "";
  switch (variant) {
    case "ERROR":
      icon = `<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>`;
      break;
    case "SUCCESS":
      icon = `<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>`;
      break;
  }

  // Construct the HTML string for the toast
  var toastHTML = `
        <div id="toast" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                ${icon}
            <span class="ms-3 text-sm font-normal">${message}</span>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-error" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    `;

  var toastElement = document.createElement("div");
  toastElement.innerHTML = toastHTML.trim();

  // Append the toast to the designated container
  var toastsContainer = document.getElementById("toasts-container");
  if (toastsContainer && toastsContainer.childElementCount <= 4) {
    toastsContainer.appendChild(toastElement.firstChild);

    var toasts = toastsContainer.childNodes;

    toasts.forEach(function (toast, index) {
      setTimeout(function () {
        if (toast.classList) {
          toast.classList.add("transition", "duration-300", "opacity-0");
        }
        setTimeout(function () {
          toast.remove();
        }, 300); // Wait for the fade out transition to complete (300ms)
      }, index * 700); // Apply a delay of 1000ms (1 second) between each toast
    });
  }
}
