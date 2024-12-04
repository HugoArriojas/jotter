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

    if (headline && prompt && promptResponse && text) {
      dispatch(setEntry({ headline, prompt, promptResponse, text }));
      setHeadline('');
      setPrompt('');
      setPromptResponse('');
      setText('');
    }
  };

  const [buttonsAndPrompts] = useState([
    // 🐞🐞 I want to figure out how to make below work but it is rendered statically due to the array, might need to go into a component
    {
      label: 'Write my own prompt',
      prompts: [],
      // field: (
      //   <div className='form-group'>
      //     <label htmlFor='prompt'>prompt</label>
      //     <input
      //       type='prompt'
      //       name='prompt'
      //       id='prompt'
      //       value={prompt}
      //       onChange={(event) => {
      //         setPrompt(event.target.value);
      //         console.log(prompt);
      //       }}
      //     />
      //   </div>
      // ),
    },
    {
      label: 'Choose a prompt',
      prompts: ['prompt1', 'prompt2', 'prompt3', 'prompt4', 'prompt5'],
      field: <PromptSelect />,
    },
  ]);

  const [selectedPrompt, setSelectedPrompt] = useState(buttonsAndPrompts[0]);

  const handlePromptSelection = (event) => {
    const promptOption = buttonsAndPrompts.find(
      (promptOption) => promptOption.label === event.target.textContent
    );
    if (promptOption) {
      promptOption.prompts.length
        ? setPrompt(promptOption.prompts[0])
        : setPrompt('');
      setSelectedPrompt(promptOption);
    }
  };

  // dropdown
  function PromptSelect() {
    return (
      <div className='form-group'>
        <label htmlFor='prompt'>prompt</label>
        <select
          className='btn-reverse btn-block select'
          onChange={(event) => {
            setPrompt(event.target.value);
          }}
          name='prompt'
          type='prompt'
          id='prompt'
          value={prompt}
        >
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
      <div className='toggle-buttons'>
        {buttonsAndPrompts.map((item, itemIndex) => {
          return (
            <button
              className={`
                btn btn-reverse btn-toggle ${
                  item.label === selectedPrompt.label
                    ? 'btn-toggled disabled'
                    : ''
                }`}
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
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          {/* <SelectedPromptOption /> */}
          <label htmlFor='headline'>headline</label>
          <input
            type='headline'
            name='headline'
            id='headline'
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />
        </div>
        <ToggleButtons />
        {selectedPrompt && selectedPrompt.field ? (
          <PromptSelect />
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
          <label htmlFor='promptResponse'>response</label>
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
