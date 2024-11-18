document.addEventListener('DOMContentLoaded', () => {
    // Get references to form elements
    const leaveForm = document.getElementById('leaveForm');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const reasonInput = document.getElementById('reason');
    const dashboardSection = document.getElementById('dashboard');

    // Function to handle form submission
    leaveForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        // Validation: Check if all fields are filled
        if (!startDateInput.value || !endDateInput.value || !reasonInput.value.trim()) {
            alert('Please fill out all fields.');
            return;
        }

        // Create a leave request object
        const leaveRequest = {
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            reason: reasonInput.value.trim(),
            status: 'Pending'
        };

        // Add the leave request to the dashboard
        addLeaveRequestToDashboard(leaveRequest);

        // Show success message
        alert('Your leave application has been submitted successfully!');

        // Clear the form
        leaveForm.reset();
    });

    // Function to add leave request to the dashboard
    function addLeaveRequestToDashboard(request) {
        const leaveItem = document.createElement('p');
        leaveItem.innerHTML = `
            Leave Request: 
            <strong>${request.startDate}</strong> to <strong>${request.endDate}</strong><br>
            Reason: ${request.reason}<br>
            Status: <span style="color: orange;">${request.status}</span>
        `;
        dashboardSection.appendChild(leaveItem);
    }
});
