import React from 'react';

const VoteForm: React.FC = () => {
  return (
    <>
      <h2>Here is the US Election vote, choose your candidate</h2>
      <form>
        <label>Your Social Number</label>
        <input />
        <label>Choose one</label>
        <select>
          <option>Joe Biden</option>
          <option>Donald Trumpt</option>
        </select>
        <button>Vote</button>
      </form>
    </>
  );
};

export { VoteForm };
