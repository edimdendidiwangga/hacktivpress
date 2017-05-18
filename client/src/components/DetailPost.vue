<template>
<div id="front" class="ui items segment padtop-6 container">

  <div class="ui segment">
    <h2 class="ui centered header">{{ post[0].title }}</h2>
    <h6 class="ui horizontal divider">
    category : {{ post[0].category }}
	</h6>
    <p>{{ post[0].content }}</p>
    <h4 class="ui horizontal divider">
    Posting by {{ post[0].author.name }}
    </h4>
    <div class="ui small buttons">
      <button class="ui positive button" v-on:click="editArticle"><i class="write icon"></i></button>
      <div class="or"></div>
      <button class="ui red button" v-on:click="deleteArticleConfirm"><i class="trash icon"></i></button>
    </div>
  </div>

  <div class="ui small modal four grid" id="modalEditArticle">
    <i class="close icon"></i>
    <div class="ui center aligned header">
      <h3>Edit Article</h3>
    </div>
    <div class="ui doubling stackable content grid container">
      <div class="content">
        <div class="ui fluid form">
          <div class="field">
            <label>Title</label>
            <input v-model="editDataArticle.title" type="text">
          </div>

          <div class="field">
            <label>Content</label>
            <textarea rows="5" v-model="editDataArticle.content"></textarea>
          </div>

          <div class="field">
            <label>Category</label>
            <select class="ui dropdown" v-model="editDataArticle.category">
						  <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
						</select>
          </div>

          <button class="ui button blue" v-on:click="updateArticle">Submit</button>
        </div>
      </div>
    </div>
  </div>

  <div class="ui basic modal" id="deleteModalArticle">
    <div class="ui icon header">
      <i class="trash icon"></i> Delete Article
    </div>
    <div class="ui centered header">
      <p>Are you sure delete this article ?</p>
    </div>
    <div class="actions">
      <div class="ui red basic cancel inverted button">
        <i class="remove icon"></i> No
      </div>
      <div class="ui green ok inverted button" v-on:click="deleteArticle">
        <i class="checkmark icon"></i> Yes
      </div>
    </div>
  </div>

</div>
</template>
<script>
export default {
  name: 'detailPost',
  props: ['id'],
  data() {
    return {
      usernameToken: localStorage.getItem('username'),
      post: {},
      editDataArticle: {
        id: '',
        title: '',
        content: '',
        category: '',
      },
      deleteDataArticle: {
        id: ''
      },
      options: [{
          text: 'javascript',
          value: 'javascript'
        },
        {
          text: 'html',
          value: 'html'
        },
        {
          text: 'css',
          value: 'css'
        },
        {
          text: 'golang',
          value: 'golang'
        },
        {
          text: 'ruby',
          value: 'ruby'
        }
      ]
    }
  },
  methods: {
    getPostId() {
      let self = this
      axios.get(`http://localhost:3000/articles/${this.id}`)
        .then(response => {
          self.post = response.data
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
    }, // end of getPostId

    editArticle() {
      let self = this
      self.editDataArticle.title = this.post[0].title
      self.editDataArticle.content = this.post[0].content
      self.editDataArticle.category = this.post[0].category
      $('#modalEditArticle').modal('show')

    },
    updateArticle() {
      let self = this
      axios.put(`http://localhost:3000/articles/${this.id}`, {
          title: self.editDataArticle.title,
          content: self.editDataArticle.content,
          category: self.editDataArticle.category
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          if (response.config.headers.token == null) {
            alert('Please login!')
          } else {
            self.getPostId()
            $('#modalEditArticle').modal('hide')
          }
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
    },
    deleteArticleConfirm() {
      $('#deleteModalArticle').modal('show')
    },
    deleteArticle() {
      let self = this
      axios.delete(`http://localhost:3000/articles/${this.id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          if (response.config.headers.token == null) {
            alert('Please login!')
          } else {
            self.getPostId()
            this.$router.push('/posts');
          }
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
    }


  },
  created() {
    this.getPostId()
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
