document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Load saved states from localStorage
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        } else if (savedState === 'false') {
            checkbox.checked = false;
        }
        // Add event listener for changes
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    function handleCheckboxChange(event) {
        const checkbox = event.target;
        // Save the new state to localStorage
        localStorage.setItem(checkbox.id, checkbox.checked);

        // Optional: If checking a main day task, check/uncheck all sub-tasks
        if (checkbox.id.endsWith('-workout') || checkbox.id.endsWith('-run') || checkbox.id.endsWith('-rest')) {
            const parentDayDiv = checkbox.closest('.day');
            if (parentDayDiv) {
                const subCheckboxes = parentDayDiv.querySelectorAll('details input[type="checkbox"]');
                subCheckboxes.forEach(subCheckbox => {
                    // Only change sub-checkbox if the main one was checked (don't uncheck subs if main is unchecked)
                    if (checkbox.checked) {
                         subCheckbox.checked = true;
                         localStorage.setItem(subCheckbox.id, true); // Update local storage as well
                    }
                    // Optionally add logic here if you want unchecking the main task to uncheck subs
                    // else {
                    //     subCheckbox.checked = false;
                    //     localStorage.setItem(subCheckbox.id, false);
                    // }
                });
            }
        }
         // Optional: If checking a sub-task, potentially update the main day task status
        else if (checkbox.closest('details')) {
             const parentDayDiv = checkbox.closest('.day');
             const mainTaskCheckbox = parentDayDiv.querySelector('header input[type="checkbox"]');
             if (mainTaskCheckbox) {
                 const allSubTasks = parentDayDiv.querySelectorAll('details input[type="checkbox"]');
                 const allSubsChecked = Array.from(allSubTasks).every(cb => cb.checked);

                 // If all sub-tasks are now checked, check the main task
                 if (allSubsChecked) {
                     mainTaskCheckbox.checked = true;
                     localStorage.setItem(mainTaskCheckbox.id, true);
                 }
                 // If unchecking a sub-task, uncheck the main task
                 else if (!checkbox.checked) {
                      mainTaskCheckbox.checked = false;
                     localStorage.setItem(mainTaskCheckbox.id, false);
                 }
             }
         }
    }
});

// 将十六进制编码转换为实际字符
const emoji = String.fromCodePoint(0x1F9CE);