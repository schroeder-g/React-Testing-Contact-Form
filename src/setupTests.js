// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react'
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
import { render, fireEvent, getAllByDisplayValue, queryAllByLabelText, getByText, screen } from '@testing-library/react'
import ContactForm from './components/ContactForm'
import { act } from 'react-dom/test-utils';

test("Sanity Test", () => {
    render(<ContactForm />)
})

test("Ensure that you can fill out the form with valid data and submit a new user", () => {
//Arrange: grab the contact form component and its inputs
    render(<ContactForm />)
    const fName = screen.getByLabelText(/first name/i)
    const lName = screen.getByLabelText(/last name/i)
    const email = screen.getByLabelText(/email/i)
    const message = screen.getByLabelText(/message/i)
    const submit = screen.getByTestId("submit")

//Act: click on the form elements and enter valid data
    act(
        fireEvent.click(fName),
        fireEvent.input(fName, {target: "Monsieur"}),
        fireEvent.input(lName, { target: "Mikado"}),
        fireEvent.input(email, { target: "donMikado@gmail.com"}),
        fireEvent.input(message, { target: "Greetings good sir, thank you for your service"}),
        fireEvent.click(submit)
    )


    //Assert: 
    const formErrs = screen.getAllByText(/Error/i)
    expect(formErrs).not.toBeInTheDocument()
})