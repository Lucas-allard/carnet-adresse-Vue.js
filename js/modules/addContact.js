export default Vue.component("addContact", {
  template: `
  <div class="container w-25">
    <h1>Ajouter un contact</h1>
    <form>
      <div class="form-group">
        <label for="lastname">Nom</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          name="lastname"
          v-model="activeContact.lastname"
        />
      </div>
      <div class="form-group">
        <label for="name">Prenom</label>
        <input type="text" class="form-control" id="name" name="name" v-model="activeContact.name" required/>
      </div>
      <div class="form-group">
        <label for="phone">Telephone</label>
        <input type="phone" class="form-control" id="phone" name="phone" v-model="activeContact.phone" required/>
      </div>
      <div class="form-group">
        <label for="Email">Email</label>
        <input type="email" class="form-control" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" id="email" name="email" v-model="activeContact.email" required/>
      </div>
      <div class="form-group">
        <label for="birthday">Date de naissance</label>
        <input type="date" class="form-control" id="birthday" name="birthday" v-model="activeContact.birthday" required/>
      </div>
      <button @click="readContact" type="submit" id="submit" class="btn btn-primary" v-on:click="$emit('save')">
        Ajouter un contact
      </button>
    </form>
  </div>
  `,

  data() {
    return {
      activeContact: {
        lastname: "",
        name: "",
        phone: "",
        email: "",
        birthday: "",
        age: "",
        modified: false,
        happyBirthday: false,
      },
      timeDay: new Date(),
      timeCalc: "",
    };
  },

  props: ["contact"],

  methods: {
    readContact(event) {
      event.preventDefault();
      let nameFormat = /^([A-Za-zéàë]{2,40} ?)+$/;
      let phoneFormat =
        /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (
        !this.activeContact.name.match(nameFormat) ||
        !this.activeContact.lastname.match(nameFormat) ||
        !this.activeContact.phone.match(phoneFormat) ||
        !this.activeContact.email.match(mailFormat) ||
        this.activeContact.birthday == ""
      ) {
        alert("veuillez remplir le formulaire correctement");
        return;
      } else {
        this.setAge();
        this.contact.push(this.activeContact);
        console.log(this.contact);
      }
      this.clearInput();
    },
    setAge() {
      this.timeCalc = new Date(this.activeContact.birthday);
      if (this.timeCalc.getMonth() < this.timeDay.getMonth()) {
        this.activeContact.age =
          this.timeDay.getFullYear() - this.timeCalc.getFullYear();
        this.activeContact.happyBirthday = false;
      } else if (this.timeCalc.getMonth() == this.timeDay.getMonth()) {
        if (this.timeCalc.getDate() == this.timeDay.getDate()) {
          this.activeContact.age =
            this.timeDay.getFullYear() - this.timeCalc.getFullYear();
          this.activeContact.happyBirthday = true;
        } else if (this.timeCalc.getDate() < this.timeDay.getDate()) {
          this.activeContact.age =
            this.timeDay.getFullYear() - this.timeCalc.getFullYear();
          this.activeContact.happyBirthday = false;
        } else {
          this.activeContact.age =
            this.timeDay.getFullYear() - this.timeCalc.getFullYear() - 1;
          this.activeContact.happyBirthday = false;
        }
      } else {
        this.activeContact.age =
          this.timeDay.getFullYear() - this.timeCalc.getFullYear() - 1;
        this.activeContact.happyBirthday = false;
      }
    },
    // clearInput() {
    //   this.activeContact.name = "";
    //   this.activeContact.lastname = "";
    //   this.activeContact.phone = "";
    //   this.activeContact.email = "";
    //   this.activeContact.birthday = "";
    // },
  },
});
