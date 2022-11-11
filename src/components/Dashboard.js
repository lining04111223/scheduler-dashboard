import React, { Component } from "react";
import Loading from "./Loading";
import Panel from "./Panel";

import classnames from "classnames";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {

  state = {
    loading: false
  };

  render() {
  const dashboardClasses = classnames("dashboard");
  const newdata=data.map((item) =>(
      <Panel
      key={item.id}
      id={item.id} 
      label={item.label} 
      value={item.value}
    />
  ));

    if (this.state.loading) {
      return <Loading />;
    }

    return (
    <main className={dashboardClasses}>
    
     {newdata}
    
    </main>
    
    );
  }
}

export default Dashboard;
