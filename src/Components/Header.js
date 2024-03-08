import React from "react";

const Header = () => {
  return (
    <div style={headerContainerStyle}>
      <h2 style={headerStyle}>Expense Tracker</h2>
    </div>
  );
};

const headerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9027a557',
  height: '70px',
};

const headerStyle = {
  textAlign: 'center',
};

export default Header;
