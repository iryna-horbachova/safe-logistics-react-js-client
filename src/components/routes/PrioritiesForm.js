import React, { useState } from 'react';
import { SubmitButton } from '../reusable/Button';
import credentials from "../../constants/constants";

class PrioritiesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { priorities: { one: 1, two: 2, three: 3, four: 4, five: 5}, driver:true};
    }

    render() {
        const options = [
            {
                label: "Health state",
                value: "1",
            },
            {
                label: "Distance",
                value: "2",
            },
            {
                label: "Pay for km",
                value: "3",
            },
            {
                label: "Average speed",
                value: "4",
            },
            {
                label: "Experience",
                value: "5",
            },
        ];

        const addPriorities = e => {
            e.preventDefault()
            this.setState({driver: false,});

            var priorities = []
            priorities.push(this.state.priorities.one)
            priorities.push(this.state.priorities.two)
            priorities.push(this.state.priorities.three)
            priorities.push(this.state.priorities.four)
            priorities.push(this.state.priorities.five)

            console.log('priorities')
            console.log(priorities)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credentials.token },
                body: JSON.stringify({ priorities: priorities }),
            };

            fetch("http://127.0.0.1:8000/assignment/" + this.props.match.params.value, requestOptions)
                .then((response) => response.json())
                .then((jsonData) => {
                    console.log(jsonData)
                    if (jsonData.error != null) {
                        alert(jsonData.error);
                    } else {
                        this.props.history.push('/route/' + this.props.match.params.value + '/driver/' + jsonData.driver.user.id)
                    }

             })
            .catch((error) => {
                console.log("error")
                console.error(error);
            })
        }

        const handleChange = e => {

            switch (e.target.id) {
                case "one":
                    this.setState({priorities: {one : e.target.selectedIndex + 1,
                        two: this.state.priorities.two,
                        three: this.state.priorities.three,
                        four: this.state.priorities.four,
                        five: this.state.priorities.five,}});
                    break;
                case "two":
                    this.setState({priorities: {one : this.state.priorities.one,
                        two: e.target.selectedIndex + 1,
                        three: this.state.priorities.three,
                        four: this.state.priorities.four,
                        five: this.state.priorities.five,}});
                    break;
                case "three":
                    this.setState({priorities: {one : this.state.priorities.one,
                        two: this.state.priorities.two,
                        three: e.target.selectedIndex + 1,
                        four: this.state.priorities.four,
                        five: this.state.priorities.five,}});;
                    break;
                case "four":
                    this.setState({priorities: {one : this.state.priorities.one,
                        two: this.state.priorities.two,
                        three: this.state.priorities.three,
                        four: e.target.selectedIndex + 1,
                        five: this.state.priorities.five,}});
                    break;
                case "five":
                    this.setState({priorities: {one : this.state.priorities.one,
                        two: this.state.priorities.two,
                        three: this.state.priorities.three,
                        four: this.state.priorities.four,
                        five: e.target.selectedIndex + 1,}});
                    break;
            }
        }
        return(
            <div class="container">
                <h1> Range priorities for the route </h1>
                <form onSubmit={addPriorities}>
                     <div className="form-group">
                         <p>First priority  </p>
                         <select value={this.state.priorities.one} onChange={handleChange} id="one">
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                     </div>
                    <div className="form-group">
                         <p>Second priority </p>
                         <select value={this.state.priorities.two} onChange={handleChange} id="two">
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                         <p>Third priority</p>
                         <select value={this.state.priorities.three} onChange={handleChange} id="three">
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                         <p>Fourth priority</p>
                         <select value={this.state.priorities.four} onChange={handleChange} id="four">
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                     </div>
                    <div className="form-group">
                         <p>Fifth priority</p>
                         <select value={this.state.priorities.five} onChange={handleChange} id="five">
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                     </div>

                    <SubmitButton
                        className="btn btn-primary"
                        label="Submit"
                    />
                </form>
            </div>
        )}
}

export default PrioritiesForm;