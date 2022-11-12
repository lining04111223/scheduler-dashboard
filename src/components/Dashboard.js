import React, { Component } from "react";
import Loading from "./Loading";
import Panel from "./Panel";
import axios from "axios";
import classnames from "classnames";
import {
  getTotalInterviews,
  getLeastPopularTimeSlot,
  getMostPopularDay,
  getInterviewsPerDay
 } from "helpers/selectors";

 const data = [
  {
    id: 1,
    label: "Total Interviews",
    getValue: getTotalInterviews
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    getValue: getLeastPopularTimeSlot
  },
  {
    id: 3,
    label: "Most Popular Day",
    getValue: getMostPopularDay
  },
  {
    id: 4,
    label: "Interviews Per Day",
    getValue: getInterviewsPerDay
  }
];

class Dashboard extends Component {

  state = {
    days:[],
    appointments:{},
    interviewers:{},
    loading: false,
    focused:null
  };

  selectPanel=(id) => {
    this.setState(!this.state.focused?
      {focused: id}:
    {focused: null});
   }

   componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      });
    });


  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  render() {
  const dashboardClasses = classnames("dashboard", {
    "dashboard--focused": this.state.focused
   });
  const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
   .map(panel => (
    <Panel
     key={panel.id}
     id={panel.id}
     label={panel.label}
     value={panel.getValue(this.state)}
     onSelect={this.selectPanel}
    />
   ));
   console.log(this.state);
    if (this.state.loading) {
      return <Loading />;
    }

    return (
    <main className={dashboardClasses}>
     {panels}
    </main>
    
    );
  }
}

export default Dashboard;
