import './formik-demo.css';
import React from 'react';
import { render } from 'react-dom';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import classNames from "classnames";

// Helper styles for demo
import './formik-demo.css';
import { MoreResources, DisplayFormikState } from './formik-helper';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    topics: Yup.array()
      .min(3, 'Pick at least 3 tags')
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
      color: Yup.string().required('Color is required!'),
      name: Yup.string().required('name is required!'),
      singleCheckbox: Yup.bool().oneOf([true], "Must agree to something"),
      checkboxGroup: Yup.array().required(
        "At least one checkbox is required"
      ),
      radioGroup: Yup.string().required("A radio option is required"),
  }),
  mapPropsToValues: props => ({
    email: '',
    topics: [],
    color: '',
    name:'',
    singleCheckbox: false,
    checkboxGroup: [],
    radioGroup: "",
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      topics: values.topics.map(t => t.value),
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
});

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>

      <label>Name</label>
        <input name="name" type="text"
          value={values.name}
          placeholder="Name"
          onChange={handleChange}
          onBlur={handleBlur} />
      {errors.name && touched.name && <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.name}</div>}
      
      <label htmlFor="email" style={{ display: 'block' }}>
        Email
      </label>
      <input
        id="email"
        placeholder="Enter your email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email &&
        touched.email && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.email}</div>
        )}
      <label htmlFor="email" style={{ display: 'block' }}>
        Color
      </label>
      <select
        name="color"
        value={values.color}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: 'block' }}
      >
        <option value="" label="Select a color" />
        <option value="red" label="red" />
        <option value="blue" label="blue" />
        <option value="green" label="green" />
      </select>
      {errors.color &&
        touched.color &&
        <div className="input-feedback">
          {errors.color}
        </div>}
        
      <MySelect
        value={values.topics}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.topics}
        touched={touched.topics}
      />
      
      {errors.myRadioGroup && touched.myRadioGroup && <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.myRadioGroup}</div>}
      
      <h2>Single checkbox</h2>
      <Field
            component={Checkbox}
            name="singleCheckbox"
            id="singleCheckbox"
            label="Agree to something"
      />
      
      <h2>Checkbox group</h2>
          <CheckboxGroup
            id="checkboxGroup"
            label="Which of these?"
            value={values.checkboxGroup}
            error={errors.checkboxGroup}
            touched={touched.checkboxGroup}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          >
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="checkbox1"
              label="Option 1"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="checkbox2"
              label="Option 2"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="checkbox3"
              label="Option 3"
            />
          </CheckboxGroup>

        <h2>Radio group</h2>
        <RadioButtonGroup
            id="radioGroup"
            label="One of these please"
            value={values.radioGroup}
            error={errors.radioGroup}
            touched={touched.radioGroup}
          >
            <Field
              component={RadioButton}
              name="radioGroup"
              id="radioOption1"
              label="Choose this option"
            />
            <Field
              component={RadioButton}
              name="radioGroup"
              id="radioOption2"
              label="Or choose this one"
            />
          </RadioButtonGroup>

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

     {/*<DisplayFormikState {...props} />*/} 
    </form>
  );
};

const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' },
];

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

// Checkbox input
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

// Checkbox group
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, children } = this.props;

    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur
              }
            });
          })}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  }
}

// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};


// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};


class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('topics', value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('topics', true);
  };

  render() {
    return (
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="color">Topics (select at least 3) </label>
        <Select
          id="color"
          options={options}
          multi={true}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
          )}
      </div>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm);

const App = () => (
  <div className="app">
    <MyEnhancedForm />
  </div>
);

render(<App />, document.getElementById('root'));
