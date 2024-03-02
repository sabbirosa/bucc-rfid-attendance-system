function getFormattedTimestamp() {
    const now = new Date();
    return "Sign In: " + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

document.addEventListener('DOMContentLoaded', function() {
    const membersDatabase = [
        { rfid: '0015236725', name: 'Nafis Sadique Niloy', designation: 'President' },
        { rfid: '2', name: 'Udoy Saha', designation: 'Vice President' },
        { rfid: '0015359418', name: 'Tahmim Hassan', designation: 'General Secretary' },
        { rfid: '0001288412', name: 'Ayesha Bintee Rob', designation: 'Treasurer' }
    ];

    function getMemberDetailsByRFID(rfidTag) {
        return new Promise((resolve, reject) => {
            const member = membersDatabase.find(member => member.rfid === rfidTag);
            if (member) {
                resolve({ ...member, timestamp: getFormattedTimestamp() });
            } else {
                reject('Member not found');
            }
        });
    }

    const rfidInput = document.getElementById('rfid-input');

    rfidInput.addEventListener('change', function(e) {
        var rfidTag = e.target.value.trim();
        if (rfidTag.length === 10) {
            getMemberDetailsByRFID(rfidTag)
                .then(memberDetails => {
                    document.querySelector('.modal .name').textContent = memberDetails.name;
                    document.querySelector('.modal .designation').textContent = memberDetails.designation;
                    document.querySelector('.modal .time-stamp').textContent = memberDetails.timestamp;

                    var successModal = new bootstrap.Modal(document.getElementById('statusSuccessModal'));
                    successModal.show();

                    e.target.value = '';
                })
                .catch(error => {
                    console.error(error);
                    e.target.value = '';
                });
        }
    });

    document.getElementById('statusSuccessModal').addEventListener('hidden.bs.modal', function () {
        rfidInput.focus();
    });
});
