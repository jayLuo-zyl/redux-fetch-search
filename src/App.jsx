import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import BillTable from './components/BillTable';
import PropTypes from 'prop-types';

const App = (props) => {
    // fetch data from provided url endpoint
    const billsApiInitFetch = async () => {
        const url = 'https://pure-wave-91339.herokuapp.com/sample-data';
        const res = await fetch(url,
            {
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            }
        );
        // console.log('res Data', res)
        return await res.json();
    };

    // What does useEffect do? By using this Hook, you tell React that your component needs to do something after render.
    //  React will remember the function you passed (we’ll refer to it as our “effect”), 
    // and call it later after performing the DOM updates. In this effect, we set the document title, 
    // but we could also perform data fetching or call some other imperative API.
    useEffect(() => {
        props.onApiFetch(billsApiInitFetch);
    });

    // const someText = "...show content...";
    // props.displayText(someText);

    // Helper function 
    const filterBills = (bills) => {
        return bills.filter((bill) => {
            const billText = bill.measureNumber.slice(0, 7).toUpperCase();
            return billText.includes(props.text) ? bill : null;
        });
    };

    // Filters all bills from search bar input
    let bills = props.bills;
    let filteredData = filterBills(bills);

    if (props.showVetoIssues  === true) {
        let vetos = bills.filter((bill) => {
            return Number(bill.voterSupport) >= 50 && bill.signedOrVetoed === "Vetoed" ? bill : null;
        });
        let sortedVetos = vetos.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        });
        filteredData = filterBills(sortedVetos);
    };

    let lableForVetoButton = props.showVetoIssues ? "All" : "Veto";

    return (
        <div className="wrapper">
            <div className="appTitle">
                <p>Oregon Bills</p>
            </div>
            <div className="searchBar" >
                <input className="inputStyle" placeholder=" Search... " type="text" value={props.text} onChange={props.searchText}></input>
            </div>
            <div className="left-box">
                <button type="button" className="vetos" onClick={props.displayVetos}>Show {lableForVetoButton} Issue</button>
            </div>
            <div className="right-box">
                <BillTable bills={filteredData} />
            </div>
        </div>
    )
};

App.propTypes = {
    text: PropTypes.string,
    bills: PropTypes.array,
    showVetoIssues: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        text: state.text,
        bills: state.bills,
        showVetoIssues: state.showVetoIssues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchText: (event) => dispatch({ type: 'SEARCH_TEXT', data: event.target.value }),
        displayVetos: () => dispatch({ type: 'DISPLAY_VETOS' }),
        // displayText: (someText) => dispatch({ type: 'SHOW_TEXT', data: someText }),
        onApiFetch: async (billsApiInitFetch) => {
            let bills = await billsApiInitFetch();
            console.log('Before Bills Dispatch:', bills);
            dispatch({ type: 'API_FETCH', data: bills })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);