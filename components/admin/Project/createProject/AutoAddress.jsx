import React, { Fragment, useRef, useState } from "react";
import { Typeahead, Menu, MenuItem } from "react-bootstrap-typeahead";

const STATIC_ADDRESSES = [
  {
    id: "loading-1",
    label:
      "Dotsquares India 229, Apparel Park, Mahal Road, CP4-228, Hare Krishna Marg, Jagatpura, Jaipur, Shri Kishanpura, Rajasthan 302017",
    latitude: 26.80187602709194,
    longitude: 75.86233533100261,
    type: "loading",
  },
  {
    id: "unloading-1",
    label:
      "World Trade Park Jawahar Lal Nehru Marg, D-Block, Malviya Nagar, Jaipur, Rajasthan 302017",
    latitude: 26.85326027458362,
    longitude: 75.80469025381774,
    type: "unloading",
  },
];

const AutoAddress = (props) => {
  const [results, setResults] = useState(STATIC_ADDRESSES);
  const [selected, setSelected] = useState([]);
  const { type } = props;

  const handleSelect = (results) => {
    const result = results[0];

    if (result) {
      if (props.selectResult) {
        props.selectResult({
          address: result.label,
          latitude: result.latitude,
          longitude: result.longitude,
          addressDetails: {
            formatted_address: result.label,
          },
        });
      }
      setSelected([result]);
    }
  };

  const handleSearch = (query) => {
    if (query !== "") {
      const filtered = STATIC_ADDRESSES.filter(
        (addr) =>
          (!type || addr.type === type) &&
          addr.label.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setSelected([
        {
          id: "",
          label: "",
          latitude: "",
          longitude: "",
          type: "loading",
        },
      ]);
      setResults(STATIC_ADDRESSES);
    }
  };

  return (
    <Fragment>
      <Typeahead
        id="typeahead"
        onChange={handleSelect}
        onInputChange={handleSearch}
        options={results}
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps}>
            {results?.map((result, index) => (
              <MenuItem key={result.id} option={result} position={index}>
                {result.label}
              </MenuItem>
            ))}
          </Menu>
        )}
        selected={
          selected && selected.length > 0
            ? selected
            : props && props.selectedAddress
            ? [{ label: props.selectedAddress }]
            : []
        }
        {...props}
        className={props && props.className ? props.className : ``}
        placeholder="Address"
      />
    </Fragment>
  );
};

export default AutoAddress;
