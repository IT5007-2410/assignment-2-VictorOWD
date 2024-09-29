const initialTravellers = [
  {
    id: 1,
    salutation: "Mr.",
    firstName: "Jack",
    lastName: "Reacher",
    dateOfBirth: "1970-01-01",
    passportNumber: "E1234567X",
    nationality: "Singaporean",
    countryOfResidence: "Singapore",
    phone: 88885555,
    email: "hello@tickettoride.com",
    bookingTime: "",
  },
  {
    id: 2,
    salutation: "Ms.",
    firstName: "Rose",
    lastName: "Wilted",
    dateOfBirth: "1970-01-01",
    passportNumber: "E1234567Z",
    nationality: "Singaporean",
    countryOfResidence: "Singapore",
    phone: 88884444,
    email: "hello@tickettoride.com",
    bookingTime: "",
  },
];

function TravellerRow({ traveller }) {
  {
    /*Q3. Placeholder to initialize local variable based on traveller prop.*/
  }
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      {Object.values(traveller).map((value, index) => {
        return <td key={index}>{value}</td>;
      })}
    </tr>
  );
}

function DisplayPage({ travellers }) {
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
    <div>
      <h2>Detailed View</h2>
      <table className="bordered-table">
        <thead>
          <tr>
            {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
            <th>ID</th>
            <th>Salutation</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Passport No.</th>
            <th>Nationality</th>
            <th>Country Of Residence</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
          {travellers.map((traveller, index) => {
            return <TravellerRow key={index} traveller={traveller} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

function AddPage({ addFunc }) {
  const [traveller, setTraveller] = React.useState({
    id: "",
    salutation: "",
    firstName: "",
    lastName: "",
    dob: "",
    passportNumber: "",
    nationality: "",
    countryOfResidence: "",
    phoneNumber: "",
    email: "",
    bookingTime: "",
  });

  function handleSubmit(e) {
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    e.preventDefault();
    addFunc(traveller);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setTraveller((prevTraveller) => ({
      ...prevTraveller,
      [name]: value,
    }));
  }

  return (
    <div>
      <h2>Add a Traveller</h2>
      <form name="addTraveller" onSubmit={handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <FormField
          label="ID"
          type="text"
          name="id"
          id="id"
          value={traveller.id}
          onChange={handleChange}
        />
        <FormField
          label="Salutation"
          type="text"
          name="salutation"
          id="salutation"
          value={traveller.salutation}
          onChange={handleChange}
        />
        <FormField
          label="First Name"
          type="text"
          name="firstName"
          id="first-name"
          value={traveller.firstName}
          onChange={handleChange}
        />
        <FormField
          label="Last Name"
          type="text"
          name="lastName"
          id="last-name"
          value={traveller.lastName}
          onChange={handleChange}
        />
        <FormField
          label="Date of Birth"
          type="date"
          name="dob"
          id="dob"
          value={traveller.dob}
          onChange={handleChange}
        />
        <FormField
          label="Passport Number"
          type="text"
          name="passportNumber"
          id="pasport-number"
          value={traveller.passportNumber}
          onChange={handleChange}
        />
        <FormField
          label="Nationality"
          type="text"
          name="nationality"
          id="nationality"
          value={traveller.nationality}
          onChange={handleChange}
        />
        <FormField
          label="Country of Residence"
          type="text"
          name="countryOfResidence"
          id="country-of-residence"
          value={traveller.countryOfResidence}
          onChange={handleChange}
        />
        <FormField
          label="Phone Number"
          type="number"
          name="phoneNumber"
          id="phone-number"
          value={traveller.phoneNumber}
          onChange={handleChange}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={traveller.email}
          onChange={handleChange}
        />
        <FormField
          label="Booking Time"
          type="datetime-local"
          name="bookingTime"
          id="booking-time"
          value={traveller.bookingTime}
          onChange={handleChange}
        />
        <button type="submit">Add Traveller</button>
      </form>
    </div>
  );
}

function FormField({ label, type, name, id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <p>THIS IS THE DELETE PAGE!</p>
        <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class HomePage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        THIS IS THE HOME PAGE!
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: "Home" };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const storedTravellers = JSON.parse(
      localStorage.getItem("storedTravellers")
    );
    if (storedTravellers) {
      this.setState({ travellers: storedTravellers });
    } else {
      localStorage.setItem(
        "storedTravellers",
        JSON.stringify(initialTravellers)
      );
      this.setState({ travellers: initialTravellers });
    }
  }

  bookTraveller(newTraveller) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    let storedTravellers = JSON.parse(localStorage.getItem("storedTravellers"));
    if (!storedTravellers) {
      storedTravellers = [];
    }
    storedTravellers.push(newTraveller);
    localStorage.setItem("storedTravellers", JSON.stringify(storedTravellers));
    this.setState({ travellers: storedTravellers });
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <Nav navFunc={this.setSelector} />
        </div>
        {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
        <main>
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === "Home" ? (
            <HomePage />
          ) : this.state.selector === "Display" ? (
            <DisplayPage travellers={this.state.travellers} />
          ) : this.state.selector === "Add" ? (
            <AddPage addFunc={this.bookTraveller} />
          ) : this.state.selector === "Delete" ? (
            <Delete />
          ) : (
            <HomePage />
          )}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        </main>
      </div>
    );
  }
}

function Nav({ navFunc }) {
  return (
    <nav>
      <NavLink text="Home" clickFn={navFunc} selector="Home" />
      <NavLink text="Display" clickFn={navFunc} selector="Display" />
      <NavLink text="Add" clickFn={navFunc} selector="Add" />
      <NavLink text="Delete" clickFn={navFunc} selector="Delete" />
    </nav>
  );
}

function NavLink({ text, clickFn, selector }) {
  return <button onClick={() => clickFn(selector)}>{text}</button>;
}

const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById("contents"));
