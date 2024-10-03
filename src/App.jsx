/*
  Added in index.html
  - Images/logo.ico
  - Bootstrap via CDN

  Q1 code submission intentionally commented to start application 
  with no travellers in the table.

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

// Global configs
const initialId = 1;
const initialPassengers = {};
const maxSeats = 10;

// App rendering method
const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById("contents"));

// Application to render
function TicketToRide() {
  const [currentId, setCurrentId ] = React.useState(0);
  const [allPassengers, setAllPassengers] = React.useState({});
  const [activePassengers, setActivePassengers] = React.useState({});
  const [selector, setSelector] = React.useState("Home");

  // Load data on first page load only
  React.useEffect(() => {
    loadData();
  }, []);
  
  // Updates localStorage on state change
  React.useEffect(() => {
    localStorage.setItem("currentId", JSON.stringify(currentId));
  }, [currentId]);

  // Updates localStorage and active passengers on state change
  React.useEffect(() => { 
    localStorage.setItem("allPassengers", JSON.stringify(allPassengers));
    updateActivePassengers(allPassengers);
  }, [allPassengers]);

  // Creates currentId and allPassengers in local storage if they don't exist
  function loadData() {
    const currentId = Number(JSON.parse(localStorage.getItem("currentId")));
    const allPassengers = JSON.parse(localStorage.getItem("allPassengers"));

    if (currentId) {
      setCurrentId(currentId);
    } else {
      setCurrentId(initialId);
    }

    if (allPassengers) {
      setAllPassengers(allPassengers);
    } else {
      setAllPassengers(initialPassengers);
    }
  }

  // Filters and updates active passengers (passengers who are non-deleted)
  function updateActivePassengers(allPassengers) {
    const activePassengers = {};
    
    Object.entries(allPassengers).forEach(([id, passenger]) => {
      if (passenger.isDisplayed) {
        activePassengers[id] = passenger;
      }
    });

    setActivePassengers(activePassengers);
  }

  function addPassenger(newPassenger) {
    if (Object.keys(activePassengers).length >= maxSeats) {
      return false;
    }

    let newId = currentId;

    setAllPassengers((existingPassengers) => {
      return {
        ...existingPassengers,
        [newId]: newPassenger
      }
    });

    newId++;
    setCurrentId(newId);

    return true;
  }

  // Soft delete used
  function deletePassenger(passengerKey) {
    if (window.confirm(`Confirm to delete passenger id: ${passengerKey}`)) {
      setAllPassengers((existingPassengers) => {
        return ({
          ...existingPassengers,
          [passengerKey]: {...existingPassengers[passengerKey], isDisplayed: false}
        })
      });
    }
  }

  function clearStorage() {
    if (window.confirm("Confirm to clear passenger info?")) {
      localStorage.clear();
      window.alert(`Your data has cleared! Start adding passengers again\n(Max capacity: ${maxSeats})`);
    }
  }

  return (
    <div>
    <header>
      <Nav navFunc={setSelector} />
    </header>
    <main>
      {selector === "Home" ? (
        <HomePage activePassengers={activePassengers} />
      ) : selector === "List" ? (
        <ListPage
          activePassengers={activePassengers}
          deleteFunc={deletePassenger}
        />
      ) : selector === "Add" ? (
        <AddPage
          activePassengers={activePassengers}
          currentId={currentId}
          addFunc={addPassenger}
        />
      ) : (
        <HomePage activePassengers={activePassengers} />
      )}
    </main>
    <footer>
      <Footer clearFunc={clearStorage}/>
    </footer>
  </div>
  );
}

function Nav({ navFunc }) {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <span className="navbar-brand d-flex flex-row align-items-center">
          <img className="me-3" src="./images/logo.ico" alt="Ticket To Ride Logo" width="30px" height="30px"/>
          <span className="fs-3">Ticket To Ride</span>
        </span>
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

function Footer({ clearFunc }){
  return (
    <div className="container-fluid d-flex flex-column align-items-center border-top mt-5">
      <button className="row btn btn-danger my-3" onClick={clearFunc}>Clear data</button>
      <div className="row fs-6 mb-3"><em>CAUTION: All passenger data will be permanently deleted.</em></div>
      <div className="row align-self-start fs-6">©️ Victor Ong for IT5007 Assignment 2, AY2024-2025 Semester 1</div>
    </div>
  )
}

function HomePage({ activePassengers }) {
  const occupiedSeats = Object.keys(activePassengers).length;

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

function ListPage({ activePassengers, deleteFunc }) {
  const passengerCount = Object.keys(activePassengers).length;

  return (
    <div>
      <div className="container-fluid">
        <div>
          <h3 className="text-center">Passenger List</h3>
          <p className="text-center fw-semibold">
            {passengerCount} passengers onboarded
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
              {Object.keys(activePassengers).length === 0 ? (
                <tr>
                  <td colSpan={12}>
                    No travellers found. Add a traveller first.
                  </td>
                </tr>
              ) : (
                Object.entries(activePassengers).map(
                  ([id, activePassenger]) => {
                    return (
                      <PassengerRow
                        key={id}
                        id={id}
                        activePassenger={activePassenger}
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

function PassengerRow({ id, activePassenger, deleteFunc }) {
  return (
    <tr>
      <td>{id}</td>
      {Object.entries(activePassenger).map(([key, value], index) => {
        if (key == "isDisplayed") return null;
        return <td key={index}>{value}</td>;
      })}
      <td>
        <button className="btn btn-danger" onClick={() => deleteFunc(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function AddPage({ activePassengers, currentId, addFunc }) {
  const passengerCount = Object.keys(activePassengers).length;
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

  const [passenger, setPassenger] = React.useState(emptyFormFields);
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (addFunc(passenger)) {
      setMessage("Successfully added new passenger!");
      setSuccess(true);
      setPassenger(emptyFormFields);
    } else {
      setMessage("Cannot add more passengers than seats available!");
      setSuccess(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setPassenger((prevPassenger) => ({
      ...prevPassenger,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className="container-fluid">
        <div>
          <h3 className="text-center">Add new Passenger</h3>
          <p className="text-center fw-semibold">
            {maxSeats - passengerCount} seats remaining
          </p>
        </div>
        <form name="addPassenger" onSubmit={handleSubmit}>
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
            value={passenger.salutation}
            placeholder="Mr, Master, Mdm, Ms"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="First Name"
            type="text"
            name="firstName"
            id="first-name"
            value={passenger.firstName}
            placeholder="John"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Last Name"
            type="text"
            name="lastName"
            id="last-name"
            value={passenger.lastName}
            placeholder="Doe"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Date of Birth"
            type="date"
            name="dob"
            id="dob"
            value={passenger.dob}
            placeholder="1970-1-1"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Passport Number"
            type="text"
            name="passportNumber"
            id="pasport-number"
            value={passenger.passportNumber}
            placeholder="E1234567X"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Nationality"
            type="text"
            name="nationality"
            id="nationality"
            value={passenger.nationality}
            placeholder="Singaporean"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Country of Residence"
            type="text"
            name="countryOfResidence"
            id="country-of-residence"
            value={passenger.countryOfResidence}
            placeholder="Singapore"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Phone Number"
            type="number"
            name="phoneNumber"
            id="phone-number"
            value={passenger.phoneNumber}
            placeholder="98765432"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            id="email"
            value={passenger.email}
            placeholder="hello@tickettoride.com"
            onChange={handleChange}
            disabled={false}
          />
          <FormField
            label="Booking Time"
            type="datetime-local"
            name="bookingTime"
            id="booking-time"
            value={passenger.bookingTime}
            placeholder="2024-09-30T03:00"
            onChange={handleChange}
            disabled={false}
          />
          <div className="d-flex flex-column align-items-center mt-3">
            <button className="btn btn-outline-primary" type="submit">
              Add
            </button>
          </div>
        </form>
        {message && (
          <div className="text-center" style={{ color: success ? "green" : "red" }}>{message}</div>
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

