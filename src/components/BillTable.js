import React from 'react';
import './../App.css';

const linkAndMeasureNumber = (bill) => {
    const link = bill.measureNumber.slice(9, bill.measureNumber.length - 1);
    const measureNumber = bill.measureNumber.slice(0, 7);
    return (
        <td><a href={link}>{measureNumber}</a></td>
    )
};

const linkAndLetter = (bill) => {
    if (bill.Links) {
        const letter = bill.Links.split(" ")[0];
        const letterLink = bill.Links.split(" ")[1].slice(1, bill.Links.split(' ')[1].length - 1);
        return {letter, letterLink} 
    } 
};

const BillTable = ({ bills }) => {
    console.log('Sent to component, bills:', bills);
    return (
        <React.Fragment>
            <table className="info">
                <thead>
                    <tr>
                        <th>Measure Number</th>
                        <th>Signed or Vetoed</th>
                        <th>Voter support</th>
                        <th>Links</th>
                        <th>Date</th>
                        <th>Relating to clause</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill, index) => {
                        const letter = linkAndLetter(bill)? linkAndLetter(bill).letter : null;
                        const letterLink = linkAndLetter(bill)? linkAndLetter(bill).letterLink : null;
                        return (
                            <tr key={index}>
                                {linkAndMeasureNumber(bill)}
                                <td>{bill.signedOrVetoed}</td>
                                <td>{bill.voterSupport}</td>
                                <td><a href={letterLink}>{letter}</a></td>
                                <td>{bill.date}</td>
                                <td>{bill.relatingToClause}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default BillTable;