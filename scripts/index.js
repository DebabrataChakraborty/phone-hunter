const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container')

    // clear phone container card before adding new cards
    phoneContainer.textContent = '';

       // Show 'No data matched' if no phones found
       const noDataMessage = document.getElementById('no-data-message');
       if (phones.length === 0) {
           noDataMessage.classList.remove('hidden'); // Show "No data matched" message
       } else {
           noDataMessage.classList.add('hidden'); // Hide "No data matched" message
       }

    // display show all btn
    const showAllBtn = document.getElementById('show-all-btn')
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    }
    else {
        showAllBtn.classList.add('hidden')
    }

    // slice
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact bg-gray-100 p-4 shadow-xl`


        // set inner html
        phoneCard.innerHTML = `
 <figure>
                <img
                src="${phone.image}" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button onclick="handleShowDetails('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show details</button>
              </div>
            </div>
`;

        phoneContainer.appendChild(phoneCard)

    })
    // hide loading dot
    toggleLoadingDot(false);

}
// handle search button
const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleLoadingDot(true);
    loadPhone(searchText, isShowAll);
}

// loadPhone();

const toggleLoadingDot = (isLoading) => {
    const loadingDot = document.getElementById('loading-dot');
    if (isLoading) {
        loadingDot.classList.remove('hidden');
    }
    else {
        loadingDot.classList.add('hidden');
    }
}

const handleShowAllBtn = () => {
    handleSearch(true);

}

const handleShowDetails = async (id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone= data.data;
    showPhoneDetails(phone)

}
const showPhoneDetails = (phone) =>{
const phoneName = document.getElementById('phone-name');
phoneName.innerText = phone.name;
const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML=`
<img src="${phone.image}" alt=""/>
<p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
`



    show_details_modal.showModal();

}