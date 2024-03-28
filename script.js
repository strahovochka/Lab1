import handlers from "./helpers/handlers.js";
import refs from "./refs.js";

refs.regForm.addEventListener("input", handlers.handleRegFormInput);
refs.regForm.addEventListener("submit", handlers.handleRegFormSubmit);
