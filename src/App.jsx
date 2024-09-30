/*
  Added: Bootstrap framework in index.html
*/

// Global configs
const initialId = 1;
const initialTravellers = {};
const maxSeats = 10;

/*
Commenting out to start application with no travellers in the table
for practical reasons but leaving commented out code 
in file for Q1 submission purposes earlier.
const initialTravellers = {
  1: {
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
  2: {
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
};
*/

function TravellerRow({ id, activeTraveller, deleteFunc }) {
  return (
    <tr>
      <td>{id}</td>
      {Object.entries(activeTraveller).map(([key, value], index) => {
        if (key == "isDisplayed") return null;
        return <td key={index}>{value}</td>;
      })}
      <td>
        <button class="btn btn-danger" onClick={() => deleteFunc(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function ListPage({ activeTravellers, deleteFunc }) {
  const numberOfTravellers = Object.keys(activeTravellers).length;

  return (
    <div>
      <div className="container-fluid">
        <div>
          <h3 className="text-center">Passenger List</h3>
          <p className="text-center fw-semibold">
            {numberOfTravellers} passengers onboarded
          </p>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
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
                <th>Amend</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {Object.keys(activeTravellers).length === 0 ? (
                <tr>
                  <td colSpan={12}>
                    No travellers found. Add a traveller first.
                  </td>
                </tr>
              ) : (
                Object.entries(activeTravellers).map(
                  ([id, activeTraveller]) => {
                    return (
                      <TravellerRow
                        key={id}
                        id={id}
                        activeTraveller={activeTraveller}
                        deleteFunc={deleteFunc}
                      />
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AddPage({ activeTravellers, currentId, addFunc }) {
  const numberOfTravellers = Object.keys(activeTravellers).length;
  const emptyFormFields = {
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
    isDisplayed: true,
  };

  const [traveller, setTraveller] = React.useState(emptyFormFields);
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (addFunc(traveller)) {
      setMessage("Successfully added traveller!");
      setSuccess(true);
      setTraveller(emptyFormFields);
    } else {
      setMessage("Cannot add more passengers than seats available!");
      setSuccess(false);
    }
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
      <div className="container-fluid">
        <div>
          <h3 className="text-center">Add a Traveller</h3>
          <p className="text-center fw-semibold">
            {maxSeats - numberOfTravellers} seats remaining
          </p>
        </div>
        <form name="addTraveller" onSubmit={handleSubmit}>
          {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
          <FormField
            label="ID"
            type="text"
            name="id"
            id="id"
            value={currentId}
            placeholder={null}
            onChange={null}
            disabled={true}
          />
          <FormField
            label="Salutation"
            type="text"
            name="salutation"
            id="salutation"
            value={traveller.salutation}
            placeholder="Mr, Master, Mdm, Ms"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="First Name"
            type="text"
            name="firstName"
            id="first-name"
            value={traveller.firstName}
            placeholder="John"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Last Name"
            type="text"
            name="lastName"
            id="last-name"
            value={traveller.lastName}
            placeholder="Doe"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Date of Birth"
            type="date"
            name="dob"
            id="dob"
            value={traveller.dob}
            placeholder="1970-1-1"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Passport Number"
            type="text"
            name="passportNumber"
            id="pasport-number"
            value={traveller.passportNumber}
            placeholder="E1234567X"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Nationality"
            type="text"
            name="nationality"
            id="nationality"
            value={traveller.nationality}
            placeholder="Singaporean"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Country of Residence"
            type="text"
            name="countryOfResidence"
            id="country-of-residence"
            value={traveller.countryOfResidence}
            placeholder="Singapore"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Phone Number"
            type="number"
            name="phoneNumber"
            id="phone-number"
            value={traveller.phoneNumber}
            placeholder="98765432"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            id="email"
            value={traveller.email}
            placeholder="hello@tickettoride.com"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Booking Time"
            type="datetime-local"
            name="bookingTime"
            id="booking-time"
            value={traveller.bookingTime}
            placeholder="2024-09-30T03:00"
            onChange={handleChange}
            disabled={false}
          />
          <div className="d-flex flex-column align-items-center mt-3">
            <button className="btn btn-outline-primary" type="submit">
              Add Traveller
            </button>
          </div>
        </form>
        {message && (
          <div style={{ color: success ? "green" : "red" }}>{message}</div>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  disabled,
}) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <label className="form-label w-50 text-start" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-control form-control-sm w-50"
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required
      />
    </div>
  );
}

function HomePage({ activeTravellers }) {
  let occupiedSeats = Object.entries(activeTravellers).length;

  function renderSeats() {
    const seats = [];
    for (let i = 0; i < occupiedSeats; i++) {
      seats.push(<SeatBox isOccupied={true} text={i + 1} key={i + 1} />);
    }
    for (let i = 0; i < maxSeats - occupiedSeats; i++) {
      seats.push(
        <SeatBox
          isOccupied={false}
          text={i + 1 + occupiedSeats}
          key={i + 1 + occupiedSeats}
        />
      );
    }
    return seats;
  }

  return (
    <div>
      <div className="container-fluid">
        <h3 className="text-center">Seating Capacity</h3>
        <p className="text-center fw-semibold">
          {maxSeats - occupiedSeats} / {maxSeats} seats remaining
        </p>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col border-end d-flex flex-column">
            <h4 className="text-center">Legend</h4>
            <div className="d-flex flex-row justify-content-center gap-2">
              <SeatBox isOccupied={true} text="Occupied" />
              <SeatBox isOccupied={false} text="Available" />
            </div>
          </div>
          <div className="col border-start d-flex flex-column">
            <h4 className="text-center">Current Capacity</h4>
            <div className="d-flex flex-row flex-wrap justify-content-center gap-2">
              {renderSeats()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeatBox({ isOccupied, text }) {
  const seatColor = isOccupied ? "red" : "green";
  return (
    <div
      className="rounded-top-circle d-flex justify-content-center align-items-center border border-2 border-dark fw-bold"
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: seatColor,
      }}
    >
      {text}
    </div>
  );
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = {
      currentId: 0,
      allTravellers: {},
      activeTravellers: {},
      selector: "Home",
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value) {
    this.setState({ selector: value });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let currentId = Number(JSON.parse(localStorage.getItem("currentId")));
    let allTravellers = JSON.parse(localStorage.getItem("allTravellers"));

    if (allTravellers) {
      this.setState({ allTravellers }, () => {
        this.updateActiveTravellers(allTravellers);
      });
    } else {
      allTravellers = initialTravellers;
      localStorage.setItem("allTravellers", JSON.stringify(allTravellers));
      this.setState({ allTravellers }, () => {
        this.updateActiveTravellers(allTravellers);
      });
    }

    if (currentId) {
      this.setState({ currentId: currentId });
    } else {
      currentId = initialId;
      localStorage.setItem("currentId", JSON.stringify(currentId));
      this.setState({ currentId });
    }
  }

  updateActiveTravellers(allTravellers) {
    const activeTravellers = {};
    Object.entries(allTravellers).forEach(([id, traveller]) => {
      if (traveller.isDisplayed) {
        activeTravellers[id] = traveller;
      }
    });
    this.setState({ activeTravellers: activeTravellers });
  }

  getCurrentId() {
    return Number(localStorage.getItem("currentId"));
  }

  bookTraveller(newTraveller) {
    if (Object.keys(this.state.activeTravellers).length == maxSeats) {
      return false;
    }

    let allTravellers = JSON.parse(localStorage.getItem("allTravellers"));
    let currentId = this.getCurrentId();

    if (!allTravellers) {
      allTravellers = initialTravellers;
    }
    if (!currentId) {
      currentId = initialId;
    }

    allTravellers[currentId] = newTraveller;
    currentId++;

    localStorage.setItem("currentId", JSON.stringify(currentId));
    localStorage.setItem("allTravellers", JSON.stringify(allTravellers));

    this.setState({ currentId, allTravellers }, () => {
      this.updateActiveTravellers(allTravellers);
    });
    return true;
  }

  deleteTraveller(travellerKey) {
    if (window.confirm(`Confirm to delete traveller id: ${travellerKey}`)) {
      const allTravellers = JSON.parse(localStorage.getItem("allTravellers"));

      allTravellers[travellerKey].isDisplayed = false;

      localStorage.setItem("allTravellers", JSON.stringify(allTravellers));

      this.setState({ allTravellers }, () => {
        this.updateActiveTravellers(allTravellers);
      });
    }
  }

  render() {
    return (
      <div>
        <header>
          <Nav navFunc={this.setSelector} />
        </header>
        <main>
          {this.state.selector === "Home" ? (
            <HomePage activeTravellers={this.state.activeTravellers} />
          ) : this.state.selector === "List" ? (
            <ListPage
              activeTravellers={this.state.activeTravellers}
              deleteFunc={this.deleteTraveller}
            />
          ) : this.state.selector === "Add" ? (
            <AddPage
              activeTravellers={this.state.activeTravellers}
              currentId={this.state.currentId}
              addFunc={this.bookTraveller}
            />
          ) : (
            <HomePage />
          )}
        </main>
      </div>
    );
  }
}

function Nav({ navFunc }) {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <span className="navbar-brand">Ticket To Ride</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="navbar-nav">
            <NavLink
              text="Seating Capacity"
              clickFn={navFunc}
              selector="Home"
            />
            <NavLink text="Passenger List" clickFn={navFunc} selector="List" />
            <NavLink text="Add Passenger" clickFn={navFunc} selector="Add" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ text, clickFn, selector }) {
  return (
    <div className="nav-item">
      <button className="nav-link" onClick={() => clickFn(selector)}>
        {text}
      </button>
    </div>
  );
}

const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById("contents"));
