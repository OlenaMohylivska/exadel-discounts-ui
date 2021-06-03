import React from 'react'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function PrimaryButton(props){

    return (
        <div>
            <Button variant="success">{props.text}</Button>
        </div>
    )
}

export default PrimaryButton

PrimaryButton.propTypes = {
    text: PropTypes.string
  };