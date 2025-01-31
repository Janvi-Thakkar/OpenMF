/*
* Button To verify a user.
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sendEmailVerifyLink } from '../../store/actions/auth';



// Custom Styles
const useStyles = makeStyles((theme) => ({
    buttonStyles: {
        width: theme.spacing(10),
        height: theme.spacing(3),
        padding: 0,
        marginTop: '1em',
        borderRadius: '2em',
        '&:focus': {
            outline: 'none'
        }
    },
    buttonText: {
        width: '100%',
        height: '100%',
        fontSize: 10,
        fontWeight: 'bolder'
    }
}))


function VerifyButton() {

    // Invoking custom styles
    const classes = useStyles()

    // Dispatcher
    const dispatch = useDispatch()

    // Get auth reducer
    const { isLoading, isVarified, isSendingLink, user } = useSelector(state => state.auth)

    // Click handler
    const handleClick = ( user ) => {

        if(user.email) {
            // Dispatch send email link
            dispatch(sendEmailVerifyLink(user.email))
        }

    }
    return (
        <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.buttonStyles}
            onClick={() => handleClick(user)}
            disabled={isLoading || isSendingLink || !user.email || isVarified || user.varified}
            style={
                (isVarified || user.varified) ?
                    { color: "#006400", borderColor: "#006400"}:
                    { color: "#ff0000", borderColor: "#ff0000"}
            }
        >
            {
                // Check Varified Status
                (isLoading) ? (
                    <span
                        className={classes.buttonText}
                    >Wait...</span>
                ) : (isSendingLink) ? (
                    <span
                        className={classes.buttonText}
                    >Sending...</span>
                ) : (isVarified || (user.varified)) ? (
                    <span
                        className={classes.buttonText}
                    >Varified</span>
                ) : (
                    <Tooltip title="Click to Verify">
                        <span
                            className={classes.buttonText}
                        >Not Varified</span>
                    </Tooltip>
                )
            }
        </Button>
    )
}

export default VerifyButton
