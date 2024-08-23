import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEntry } from '../features/journal/journalSlice';

function JournalForm() {
  const [headline, setHeadline] = useState('');
  const [prompt, setPrompt] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(setEntry({ headline, prompt, promptResponse, text }));
    setHeadline('');
    setPrompt('');
    setPromptResponse('');
    setText('');
  };

  const [buttonsAndPrompts] = useState([
    {
      label: 'Choose a prompt',
      prompts: ['prompt1', 'prompt2', 'prompt3', 'prompt4', 'prompt5'],
      field: <PromptSelect />,
    },
    {
      label: 'Write my own prompt',
      prompts: [],
    },
  ]);

  const [selectedPrompt, setSelectedPrompt] = useState(buttonsAndPrompts[0]);

  const handlePromptSelection = (event) => {
    const promptOption = buttonsAndPrompts.find(
      (promptOption) => promptOption.label === event.target.textContent
    );
    if (promptOption) {
      setSelectedPrompt(promptOption);
    }
  };

  function PromptSelect() {
    return (
      <div>
        <select>
          {selectedPrompt.prompts.map((prompt, index) => (
            <option key={index}>{prompt}</option>
          ))}
        </select>
      </div>
    );
  }

  // Choose Prompt Buttons
  function ToggleButtons() {
    return (
      <div>
        {buttonsAndPrompts.map((item, itemIndex) => {
          return (
            <button
              key={itemIndex}
              onClick={(event) => handlePromptSelection(event)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }


  return (
    <section className='form'>
      <ToggleButtons />
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='headline'>headline</label>
          <input
            type='headline'
            name='headline'
            id='headline'
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />
        </div>
        {selectedPrompt && selectedPrompt.field ? (
          selectedPrompt && selectedPrompt.field
        ) : (
          <div className='form-group'>
            <label htmlFor='prompt'>prompt</label>
            <input
              type='prompt'
              name='prompt'
              id='prompt'
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
          </div>
        )}
        <div className='form-group'>
          <label htmlFor='promptResponse'>promptResponse</label>
          <input
            type='promptResponse'
            name='promptResponse'
            id='promptResponse'
            value={promptResponse}
            onChange={(event) => setPromptResponse(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Entry</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <button
            className='btn btn-block'
            type='submit'
          >
            Add Entry
          </button>
        </div>
      </form>
    </section>
  );
}

export default JournalForm;
