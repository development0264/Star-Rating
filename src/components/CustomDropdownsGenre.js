import { React, forwardRef } from 'react'
import { Dropdown, Form } from 'react-bootstrap';


export default function CustomDropdowns(props) {
    const { heading, menuItems, setCategory } = props;

    const CheckDropdownItem = forwardRef(
        ({ children, id, checked, onChange }, ref) => {
            return (
                <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
                    <Form.Check
                        type="checkbox"
                        label={children}
                        checked={checked}
                        onChange={onChange.bind(onChange, id)}
                    />
                </Form.Group>
            );
        }
    );

    const handleChecked = (key, event) => {
        const categoryArray = [...menuItems];
        const catagoryIndex = categoryArray.findIndex((data) => data.category === key);
        categoryArray[catagoryIndex].checked = event.target.checked;
        setCategory(categoryArray);
    };

    return (
        <Dropdown className='genres-btn'>
            <Dropdown.Toggle variant="" className='genre-btn' id="dropdown-basic">{heading}</Dropdown.Toggle>
            <Dropdown.Menu>
                {menuItems?.map((item, index) =>
                    <div key={index}>
                        <Dropdown.Item
                            key={item.category}
                            as={CheckDropdownItem}
                            id={item.category}
                            checked={item.checked}
                            onChange={handleChecked}
                        >
                            {item.category}
                        </Dropdown.Item>
                    </div>
                )}

            </Dropdown.Menu>
        </Dropdown >
    )
}
