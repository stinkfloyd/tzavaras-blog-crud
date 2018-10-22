document.addEventListener(`DOMContentLoaded`, () => {
  let listDiv = document.getElementById(`listDiv`)
  let blogDiv = document.getElementById(`blogDiv`)
  let formID = document.getElementById(`formID`)
  let editFormDiv = document.getElementById(`editFormDiv`)
  let newFormDiv = document.getElementById(`newFormDiv`)
  let newButton = document.getElementById(`newButton`)
  let newForm = document.getElementById(`newForm`)
  let editForm = document.getElementById(`editForm`)

  const buildList = () => {
    // clear out the listDiv
    while (listDiv.firstChild) {
      listDiv.removeChild(listDiv.firstChild)
    }
    newFormDiv.hidden = true
    editFormDiv.hidden = true
    axios.get(`/blogs`)
      .then((blogs) => {
        blogs.data.forEach((blog) => {
          let button = document.createElement(`button`)
          button.classList.add(`btn`)
          button.classList.add(`btn-secondary`)
          button.innerText = blog.title
          button.setAttribute(`data-id`, blog.id)
          button.addEventListener(`click`, (event) => {
            newFormDiv.hidden = true
            editFormDiv.hidden = true
            let blogId = event.target.getAttribute('data-id')
            axios.get(`/blogs/${blogId}`)
              .then((response) => {
                while (blogDiv.firstChild) {
                  blogDiv.removeChild(blogDiv.firstChild)
                }
                let blogTitle = document.createElement(`h1`)
                blogTitle.id = `blogTitle`
                blogTitle.innerText = response.data.title
                let blogContent = document.createElement(`p`)
                blogContent.id = `blogContent`
                blogContent.innerText = response.data.content
                blogDiv.appendChild(blogTitle)
                blogDiv.appendChild(blogContent)

                let editButton = document.createElement(`button`)
                editButton.innerText = `Edit`
                editButton.classList.add(`btn`)
                editButton.classList.add(`btn-warning`)
                editButton.setAttribute(`data-id`, blog.id)
                editButton.addEventListener(`click`, (event) => {
                  let blogId = event.target.getAttribute('data-id')
                  editFormDiv.hidden = false;
                  newFormDiv.hidden = true
                  formID.value = blogId
                  let editFormTitle = document.getElementById(`editFormTitle`)
                  editFormTitle.value = document.getElementById(`blogTitle`).innerText
                  editFormContent.value = document.getElementById(`blogContent`).innerText
                })

                let deleteButton = document.createElement(`button`)
                deleteButton.innerText = `Delete`
                deleteButton.classList.add(`btn`)
                deleteButton.classList.add(`btn-danger`)
                deleteButton.setAttribute(`data-id`, blog.id)
                deleteButton.addEventListener(`click`, (event) => {
                  let blogId = event.target.getAttribute('data-id')
                  editFormDiv.hidden = true
                  newFormDiv.hidden = true
                  // DELETE THIS RECORD
                  axios.delete(`/blogs/${blogId}`)
                    .then((response) => {
                      event.target.parentElement.remove()
                      location.reload()
                    })
                    .catch((err) => {
                      throw err
                    })
                })
                blogDiv.appendChild(editButton)
                blogDiv.appendChild(deleteButton)
              })
          })
          listDiv.appendChild(button)
        })
      })
      .catch((err) => {
        throw err
      })
  }

  newButton.addEventListener(`click`, (event) => {
    while (blogDiv.firstChild) {
      blogDiv.removeChild(blogDiv.firstChild)
    }
    newFormDiv.hidden = false;
    editFormDiv.hidden = true
  })

  newForm.addEventListener(`submit`, (event) => {
    event.preventDefault()

    // grab all values from the form
    let postData = {}

    let formElements = event.target.elements

    for (let i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if (inputName) {
        postData[inputName] = formElements[i].value
      }
    }
    // axios.post that data to the correct backend route
    axios.post('/blogs', postData)
      .then((response) => {
        buildList()
        newForm.reset()
      })
      .catch((error) => {
        console.log(`should be an error`, error);
      })
  })

  editForm.addEventListener(`submit`, (event) => {
    event.preventDefault()

    let blogId = document.getElementById(`formID`).value
    // grab all values from the form
    let postData = {}
    let formElements = event.target.elements

    for (let i = 1; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if (inputName) {
        postData[inputName] = formElements[i].value
      }
    }
    // axios.post that data to the correct backend route
    axios.put(`/blogs/${blogId}`, postData)
      .then((response) => {
        location.reload()
        editForm.reset()
      })
      .catch((error) => {
        console.log(`should be an error`, error);
      })
  })


  buildList()
})