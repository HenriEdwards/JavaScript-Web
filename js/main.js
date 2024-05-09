

// Initialize CodeMirror input area
let editor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
  mode: 'javascript',
  lineNumbers: true,
  theme: 'monokai'
});

// Initialize CodeMirror output area
let outputEditor =  CodeMirror.fromTextArea(document.getElementById('output'),{
    mode: 'javascript',
    theme: 'monokai',
    readOnly: true
    });

// Initialize CodeMirror precoded areas 
let preCodeEditors = document.getElementsByClassName('precode');
for (let i = 0; i < preCodeEditors.length; i++) {
  let preCodeEditor = CodeMirror.fromTextArea(preCodeEditors[i], {
    mode: 'javascript',
    lineNumbers: true,
    readOnly: true,
    theme: 'monokai'
  });
};

// Preserve cursor position on input
editor.on('beforeChange', function(instance, change) {
  let cursor = instance.getCursor();
  change.update = function() {
    CodeMirror.prototype.update.apply(this, arguments);
    instance.setCursor(cursor);
  };
});


function runCode() {
  // Get the input from the CodeMirror editor
  let jsCode = editor.getValue();

  try {
    // Clear the output area
    outputEditor.setValue('');

    // Redirect console.log to the output area
    console.log = function(message) {
      outputEditor.setValue(outputEditor.getValue() + message + '\n');
    };

    // Evaluate the JavaScript code
    eval(jsCode);
  } catch (error) {
    // If there's an error, display it in the output area
    outputEditor.setValue(error.toString());
  }
}
