import addContact from "./modules/addContact.js";
import showContact from "./modules/showContact.js";

new Vue({
  el: "#app",
  // components: { addContact },

  data: {
    contact: [
      {
        lastname: "",
        name: "",
        phone: "",
        email: "",
        birthday: "",
        happyBirthday: false,
        age: "",
        modified: false,
      },
    ],
    timeDay: new Date(),
    timeCalc: "",
  },

  methods: {
    loadContacts() {
      this.contact = JSON.parse(window.localStorage.getItem("carnet"));
      if (this.contact == undefined) {
        this.contact = [];
      }
    },

    save() {
      this.contact = JSON.stringify(this.contact);
      window.localStorage.setItem("carnet", this.contact);
      this.contact = JSON.parse(this.contact);
    },
    
    getHappyBirthday() {
      for (let i = 0; i < this.contact.length; i++) {
        this.timeCalc = new Date(this.contact[i].birthday);
        if (this.timeCalc.getMonth() < this.timeDay.getMonth()) {
          this.contact[i].age =
            this.timeDay.getFullYear() - this.timeCalc.getFullYear();
          this.contact[i].happyBirthday = false;
        } else if (this.timeCalc.getMonth() == this.timeDay.getMonth()) {
          if (this.timeCalc.getDate() == this.timeDay.getDate()) {
            this.contact[i].age =
              this.timeDay.getFullYear() - this.timeCalc.getFullYear();
            this.contact[i].happyBirthday = true;
          } else if (this.timeCalc.getDate() < this.timeDay.getDate()) {
            this.contact[i].age =
              this.timeDay.getFullYear() - this.timeCalc.getFullYear();
            this.contact[i].happyBirthday = false;
          } else {
            this.contact[i].age =
              this.timeDay.getFullYear() - this.timeCalc.getFullYear() - 1;
            this.contact[i].happyBirthday = false;
          }
        } else {
          this.contact[i].age =
            this.timeDay.getFullYear() - this.timeCalc.getFullYear() - 1;
          this.contact[i].happyBirthday = false;
        }
      }
    },
  },
  mounted() {
    this.loadContacts();
    this.getHappyBirthday();
  },
});
