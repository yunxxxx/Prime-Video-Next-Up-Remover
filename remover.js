console.log("remover.js loaded");

function removeAnnoyingIcon() {
    const elements = document.querySelectorAll(".f18oq18q.f6suwnu.fhxjtbc.f1ngx5al");
    console.log("Elements found: ", elements.length);
    elements.forEach(element => {
        console.log("Removing element: ", element);
        element.remove();
    });
}

// Run initially to catch elements that are already loaded
removeAnnoyingIcon();

// Use MutationObserver to catch elements that load later
const observer = new MutationObserver(() => {
    removeAnnoyingIcon();
});

observer.observe(document.body, { childList: true, subtree: true });
