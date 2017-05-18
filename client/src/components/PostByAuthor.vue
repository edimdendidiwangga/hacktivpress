<template>
<div id="front" class="ui items segment padtop-6 container">
  <select class="ui dropdown" v-model="addArticle.category">
		<option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
	</select> Search By Category
  <br>
  <select class="ui dropdown" v-model="addArticle.category">
		<option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
	</select> Search By Author
  <br>
  <button class="ui primary button" v-on:click="showAddArticle">Add Post Article</button>
  <div class="ui divided items">
    <div class="item" v-for="post in listPost">
      <!--  v-if="listPost.length != 0" -->
      <div class="content">
        <a class="header" v-on:click="singlePost(post._id)">{{ post.title }}</a>
        <div class="meta">
          <span class="cinema">publish {{ post.created}}</span>
        </div>
        <div class="description">
          <p>{{ post.content.substring(0, 100) }}</p>
        </div>
        <div class="extra">
          <a>
            <div class="ui label" v-on:click="singlePost(post._id)"><i class="globe icon"></i> Read More</div>
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="item" v-if="listPost.length == 0">
      <div class="content">
        <p>No Data</p>
      </div>
    </div> -->

  </div>

  <div class="ui small modal four grid" id="modalAddArticle">
    <i class="close icon"></i>
    <div class="ui center aligned header">
      <h3>Add Article</h3>
    </div>
    <div class="ui doubling stackable content grid container">
      <div class="content">
        <div class="ui fluid form">
          <div class="field">
            <label>Title</label>
            <input v-model="addArticle.title" type="text" value="">
          </div>

          <div class="field">
            <label>Content</label>
            <textarea rows="5" v-model="addArticle.content"></textarea>
          </div>

          <div class="field">
            <label>Category</label>
            <select class="ui dropdown" v-model="addArticle.category">
						  <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
						</select>
          </div>

          <button class="ui button blue" v-on:click="insertArticle">Submit</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>



<script>
export default {
	props: ['author'],
  data() {
    return {
      listPost: [],
			listPostCat: [],
			listPostAut: [],
			searchDataCategory: '',
	    searchDataAuthor: '',
      addArticle: {
        title: '',
        content: '',
        category: '',
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
		getPostCategory() {
      let self = this
      axios.get(`http://localhost:3000/articles/category/${this.author}`)
        .then(response => {
          self.post = response.data
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
    },
    singlePost(id) {
      this.$router.push('/detail-post/' + id);
    },
    insertArticle() {
      let self = this
      axios.post('http://localhost:3000/articles/', {
          title: self.addArticle.title,
          content: self.addArticle.content,
          category: self.addArticle.category
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          if (response.config.headers.token == null) {
            alert('Please login!')
          } else {
            self.listItems()
            $('#modalAddArticle').modal('hide')
          }
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
    },
    showAddArticle() {
      this.addArticle.title = ''
      this.addArticle.content = ''
      this.addArticle.category = ''
      $('#modalAddArticle').modal('show')
    },
		listCategory() {
			let self = this;
      axios.get('http://localhost:3000/articles')
        .then(response => {
          self.listPostCat = response.data;
          console.log('listPostCat ', response.data);
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
		},
		listAuthor() {
			let self = this;
      axios.get('http://localhost:3000/articles')
        .then(response => {
          self.listPostAut = response.data;
          console.log('listPostAut ', response.data);
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
		}
  },
  created() {
    this.getPostCategory()
		this.listCategory()
		this.listAuthor()
  }

} // end of export
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
