import React from 'react';
import { Input, Label, FormText, FormGroup, InputGroup, InputGroupText, InputGroupAddon} from 'reactstrap'

const InputField = ({name, label, type, id, ft, i, change}) => {
    let formtext = '';
    if(ft) {
        formtext = (
            <FormText color="muted" style={{align: "left"}}>{ft}</FormText>
        );
    }
    let icon = '';
    if (i) {
        var icon_type;
        if (type === 'email') {
            icon_type = '@';
        } else if (type === 'number') {
            icon_type = "N";
         } else if (type === 'text') {
            icon_type = "T";
        } else if (type === 'password') {
            icon_type = '*';
        } else {
            icon_type = ">";
        }
        icon = (
            <InputGroupAddon addonType="prepend">
                <InputGroupText>{icon_type}</InputGroupText>
            </InputGroupAddon>
        )
    }
    return (
        <FormGroup>
            <Label for={id || name}>{label}</Label>
            <InputGroup>
                {icon}
                <Input type={type} name={name} id={id || name} placeholder={label} onChange={change}/>
            </InputGroup>
            {formtext}
        </FormGroup>
    );
}

export default InputField;