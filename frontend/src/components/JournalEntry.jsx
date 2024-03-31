import { useDispatch } from 'react-redux';
import { deleteEntry } from '../features/journal/journalSlice';

function JournalEntry({ entry }) {
  const dispatch = useDispatch();

  return (
    <div className='entry'>
      <div>{new Date(entry.createdAt).toLocaleString('en-US')}</div>
      <h2>{entry.headline}</h2>
      <p>{entry.prompt}</p>
      <p>{entry.promptResponse}</p>
      <p>{entry.text}</p>
      <button
        onClick={() => dispatch(deleteEntry(entry._id))}
        className='close'
      >
        X
      </button>
    </div>
  );
}

export default JournalEntry;
