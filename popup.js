document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const controlBar = document.getElementById('controlBar');

    // Load the current state from storage
    chrome.storage.sync.get('extensionEnabled', function (data) {
        const extensionEnabled = data.extensionEnabled !== false;
        toggleSwitch.checked = extensionEnabled;
        updateControlBar(extensionEnabled);
    });

    // Add event listener for the switch
    toggleSwitch.addEventListener('change', function () {
        const extensionEnabled = toggleSwitch.checked;

        // Save the new state in storage
        chrome.storage.sync.set({ extensionEnabled: extensionEnabled }, function () {
            // Notify background script of the change
            chrome.runtime.sendMessage({ extensionEnabled: extensionEnabled });
            // Update control bar
            updateControlBar(extensionEnabled);
        });
    });

    function updateControlBar(enabled) {
        if (enabled) {
            controlBar.textContent = 'Blocking';
            controlBar.style.color = 'green';
        } else {
            controlBar.textContent = 'Extension Disabled';
            controlBar.style.color = 'red';
        }
    }
});
