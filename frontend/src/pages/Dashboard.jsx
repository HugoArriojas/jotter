import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import JournalForm from '../components/JournalForm';
import JournalEntry from '../components/JournalEntry';
import Spinner from '../components/Spinner';
import { getEntries, reset } from '../features/journal/journalSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { journalEntries, isLoading, isError, message } = useSelector(
    (state) => {
      return state.journal;
    }
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getEntries());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Journal Dashboard</p>
      </section>

      <JournalForm />

      <section className='content'>
        {journalEntries.length > 0 ? (
          <div className='entries'>
            {journalEntries.map((entry) => (
              <JournalEntry
                key={entry._id}
                entry={entry}
              />
            ))}
          </div>
        ) : (
          <h3>You have not written any entries</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
