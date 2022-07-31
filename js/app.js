const post_modal_form = document.getElementById('post_modal_form');
const edit_post_details = document.getElementById('edit_post_details');
const edit_post_form = document.getElementById('edit_post_form');
const msg = document.querySelector('.msg');
const post_details = document.querySelector('.post-details');


const postDataShow = () => {
    let data = readLSData('post');

    let list = '';

    if( !data || data.length == 0){
        list += `
            <div class="card">
                <div class="card-body">
                    <h3>No Post Found!!</h3>
                </div>
            </div>
        `;
    }

    if( data && data.length > 0){
        data.map((postItem, index) => {
        list += `
            <div class="card p-3 mb-4">
                <div class="d-flex justify-content-between">
                    <div class="post-details-left">
                        <div class="d-flex">
                            <div class="profile-img">
                                <a href="#">
                                    <img src="${postItem.authPhoto}" alt="" class="rounded-circle shadow">
                                </a>
                            </div>
                            <div class="profile-des ms-3">
                                <div class="nav">
                                    <h6 class="nav-item">
                                        <a href="#" class="profile-des-title">${postItem.authName}</a>
                                    </h6>
                                    <span class="nav-item">
                                        2hr
                                    </span>
                                </div>
                                <p class="small">${postItem.authDesignation}</p>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown post-details-right">
                        <a href="#" class="threeDots" id="threeDots-dropdown" data-bs-toggle="dropdown"
                            aria-expanded="true">
                            <i class="bi bi-three-dots"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="threeDots-dropdown">
                            <li><a class="dropdown-item edit_btn" href="#edit-post-modal" data-bs-toggle="modal" postIndex = ${ index } href="#">Edit</a></li>
                            <li><a class="dropdown-item delete_btn" postIndex = ${ index } href="#">Delete</a></li>
                        </ul>
                    </div>
                </div>
                <div class="post-content">
                    <p class="mt-4 mb-3">${postItem.postDescription}</p>
                    <img src="${postItem.postPhoto}" alt="" class="img-fluid rounded">
                </div>
            </div>
        `;
    })
    }
    
    post_details.innerHTML = list;
}

postDataShow();

post_modal_form.onsubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData(e.target);
    let { authName, authPhoto, authDesignation, postDescription, postPhoto } = Object.fromEntries(form_data.entries());
    let postInfo = Object.fromEntries(form_data.entries());

    if( !authName || !authPhoto || !authDesignation || !postDescription || !postPhoto){
        msg.innerHTML = setAlert('All fields are required!');
    }else{

        createLSData('post', postInfo);

        msg.innerHTML = setAlert('Data Stable', 'success');
        e.target.reset();
        postDataShow();
    }
}

post_details.onclick = (e) => {
    e.preventDefault();

   if(e.target.classList.contains('edit_btn')){
        let index = e.target.getAttribute('postIndex');
        let data = readLSData('post');
        let { authName, authPhoto, authDesignation, postDescription, postPhoto } = data[index];
        
        edit_post_form.innerHTML = `
            
            <div class="my-3">
                    <label for="">Auth Name</label>
                    <input type="text" class="form-control" name="authName" value="${authName}">
                </div>
                <div class="my-3">
                    <img src="${authPhoto}" alt="" class="w-100">
                </div>
                <div class="my-3">
                    <label for="">Auth Photo</label>
                    <input type="text" class="form-control" name="authPhoto" value="${authPhoto}">
                </div>
                <div class="my-3">
                    <label for="">Auth Designation</label>
                    <input type="text" class="form-control" name="authDesignation" value="${authDesignation}">
                </div>
                <div class="my-3">
                    <input type="hidden" class="form-control" name="index" value="${index}">
                </div>
                <div class="my-3">
                    <label for="">post Description</label>
                    <textarea id="" rows="3" class="form-control" name="postDescription">${postDescription}</textarea>
                </div>
                <div class="my-3">
                    <img src="${postPhoto}" class="w-100" alt="">
                </div>
                <div class="my-3">
                    <label for="">post Photo</label>
                    <input type="text" class="form-control" name="postPhoto" value="${postPhoto}">
                </div>
                <div class="my-3">
                    <input type="submit" class="btn btn-primary w-100" value="Edit Post">
                </div>
        `;
   }
   if(e.target.classList.contains('delete_btn')){

        let index = e.target.getAttribute('postIndex');

        let conf = confirm('Are you sure ??')

        if(conf){
            let data = readLSData('post');

            data.splice(index, 1);
            updateLSData('post', data);
            postDataShow();
        }
   }
}

edit_post_form.onsubmit = (e) => {
    e.preventDefault();


    let form_data = new FormData(e.target);
    let {authName, authPhoto, authDesignation, postDescription, postPhoto, index} = Object.fromEntries(form_data.entries());


    let all_data = readLSData('post');

    all_data[index] = {authName, authPhoto, authDesignation, postDescription, postPhoto};

    console.log(all_data);

    

    updateLSData('post', all_data);
    postDataShow();
    
}