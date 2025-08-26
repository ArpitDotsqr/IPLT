import LoaderComponent from '@/components/comman_component/Loader';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Field } from 'react-final-form';
import { useSelector } from 'react-redux';

const Requirment = (props) => {
  const { values, push, remove, change, touched, errors } = props

  const router = useRouter()
  const [isDieselAlloted, setDieselAlloted] = useState(false);
  const [isCashAlloted, setCashAlloted] = useState(false)

  const projectLoader = useSelector((state) => state.projectSlice.isLoading)

  return (
    <>
      {projectLoader && <LoaderComponent />}
      <div className='ProjectRequirementTab'>
      <div className='Project_basic_Detail'>
        <div className='d-flex gap-2 align-items-center'>
          <h2>Field Executive Deployment</h2>
          {errors.isFieldExecutiveLoading &&
            (touched.isFieldExecutiveLoading && touched.isFieldExecutiveFuelPump && touched.isFieldExecutiveWeighment && touched.isFieldExecutiveUnloading) &&
            <span className='start_icon mb-4'>{errors.isFieldExecutiveLoading}</span>}
        </div>
        <div className='d-flex flex-wrap project_requirments_main'>
          <div className='project_requirments_inner'>
            <p>Loading Point</p>
            <div className='RequirementLabelCheckbox' >
              <Field name='isFieldExecutiveLoading' type='radio' value={true}>
                {({ input, meta }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isFieldExecutiveLoading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className='project_requirments_inner'>
            <p>Fuel Pump</p>
            <div className='RequirementLabelCheckbox' >
              <Field name='isFieldExecutiveFuelPump' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isFieldExecutiveFuelPump' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>
          <div className='project_requirments_inner'>
            <p>Weighment Point</p>
            <div className='RequirementLabelCheckbox' >
              <Field name='isFieldExecutiveWeighment' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isFieldExecutiveWeighment' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>


          </div>
          <div className='project_requirments_inner'>
            <p>Unloading Point</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isFieldExecutiveUnloading' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isFieldExecutiveUnloading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className='Project_basic_Detail'>
        <div className='d-flex gap-2 align-items-center'>
          <h2>Vehicle Pass Requirement</h2>
          {errors.isVehiclePassRequired && (touched.isVehiclePassRequired) &&
            <span className='start_icon mb-4'>{errors.isVehiclePassRequired}</span>}
        </div>

        <div className='RequirementLabelCheckbox VehiclePassRequirement'>
          <Field name='documentsRequired.rc' type='checkbox'  >
            {({ input }) => (
              <div className="RequirementTabDFlex">
                <input
                  {...input}
                  type='checkbox'
                  id='rc'
                  disabled={values.isVehiclePassRequired !== true}
                />
                <label className='m-lg-2'>RC</label>
              </div>
            )}
          </Field>
          <Field name='documentsRequired.insurance' type='checkbox'  >
            {({ input }) => (
              <div className="RequirementTabDFlex">
                <input
                  {...input}
                  type='checkbox'
                  id='insurance'
                  disabled={values.isVehiclePassRequired !== true}
                />
                <label className='m-lg-2' >Insurance</label>
              </div>
            )}
          </Field>
          <Field name='documentsRequired.fitness' type='checkbox'  >
            {({ input }) => (
              <div className="RequirementTabDFlex">
                <input
                  {...input}
                  type='checkbox'
                  id='fitness'
                  disabled={values.isVehiclePassRequired !== true}
                />
                <label className='m-lg-2' >Fitness</label>
              </div>
            )}
          </Field>
          <Field name='documentsRequired.driverLicense' type='checkbox' >
            {({ input }) => (
              <div className="RequirementTabDFlex">
                <input
                  {...input}
                  type='checkbox'
                  id='driverLicense'
                  disabled={values.isVehiclePassRequired !== true}
                />
                <label className='m-lg-2'>Driver's Licence</label>
              </div>
            )}
          </Field>
          <Field name='documentsRequired.other' type='checkbox' >
            {({ input }) => (
              <div className="RequirementTabDFlex">
                <input
                  {...input}
                  type='checkbox'
                  id='other'
                  disabled={values.isVehiclePassRequired !== true}
                />
                <label className='m-lg-2' >Other</label>
              </div>
            )}
          </Field>
        </div>

        <div className='project_requirments_inner d-flex align-items-center'>
          <div className='RequirementLabelCheckbox' >
            <Field name='isVehiclePassRequired' type='radio' value={true}>
              {({ input }) => (
                <div className="RequirementTabDFlex">
                  <input
                    {...input}
                    type='radio'
                    value={true}
                    onChange={() => input.onChange(true)}
                  />
                  <label className='RequirementTabLabel'>Yes</label>
                </div>
              )}
            </Field>
            <Field name='isVehiclePassRequired' type='radio' value={false} >
              {({ input }) => (
                <div className="RequirementTabDFlex">
                  <input
                    {...input}
                    type='radio'
                    value={false}
                    onChange={() => input.onChange(false)}
                  />
                  <label className='RequirementTabLabel'>No</label>
                </div>
              )}
            </Field>
          </div>
        </div>
      </div>

      <div className='Project_basic_Detail'>
        <div className='d-flex gap-2 align-items-center'>
          <h2>Vehicle Weighment</h2>
          {errors.isVehicleWeightLoading && (touched.isVehicleWeightLoading && touched.isVehicleWeightTareWeight && touched.isVehicleWeightTwiceUnloading) &&
            <span className='start_icon mb-4'>{errors.isVehicleWeightLoading}</span>}
        </div>
        <div className='d-flex project_requirments_main'>
          <div className='project_requirments_inner'>
            <p>Loading </p>
            <div className='RequirementLabelCheckbox' >
              <Field name='isVehicleWeightLoading' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isVehicleWeightLoading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className='project_requirments_inner'>
            <p>Standard Tare Weight</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isVehicleWeightTareWeight' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isVehicleWeightTareWeight' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>
          <div className='project_requirments_inner'>
            <p>Twice near Unloading</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isVehicleWeightTwiceUnloading' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isVehicleWeightTwiceUnloading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className='Project_basic_Detail'>
        <div className='d-flex gap-2 align-items-center'>
          <h2>Geo-fencing</h2>
          {errors.isGeoFencingLoading && (touched.isGeoFencingLoading && touched.isGeoFencingUnloading) &&
            <span className='start_icon mb-4'>{errors.isGeoFencingLoading}</span>}
        </div>
        <div className='d-flex project_requirments_main'>
          <div className='project_requirments_inner'>
            <p>Loading</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isGeoFencingLoading' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isGeoFencingLoading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>
          <div className='project_requirments_inner'>
            <p>Unloading</p>
            <div className='RequirementLabelCheckbox' >
              <Field name='isGeoFencingUnloading' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isGeoFencingUnloading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>
        </div>
      </div>
      <div className='Project_basic_Detail'>
        <div className='d-flex gap-2 align-items-center'>
          <h2>Geo-tagged picture requirement</h2>
          {errors.isGeoImgLoading && (touched.isGeoImgLoading && touched.isGeoImgWeighment && touched.isGeoImgUnloading) &&
            <span className='start_icon mb-4'>{errors.isGeoImgLoading}</span>}
        </div>

        <div className='d-flex project_requirments_main'>
          <div className='project_requirments_inner'>
            <p>Loading Point</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isGeoImgLoading' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isGeoImgLoading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>
          <div className='project_requirments_inner'>
            <p>Weighment Point</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isGeoImgWeighment' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isGeoImgWeighment' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>
          <div className='project_requirments_inner'>
            <p>Unloading Point</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isGeoImgUnloading' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isGeoImgUnloading' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>
        </div>
      </div>
      <div className='Project_basic_Detail'>
        <div className='d-flex gap-2 align-items-center'>
          <h2>Diesel and Trip Cash</h2>
          {errors.isDieselAllotted && (touched.isDieselAllotted && touched.isCashAllotted) &&
            <span className='start_icon mb-4'>{errors.isDieselAllotted}</span>}
        </div>
        <div className='d-flex'>
          <div className='d-flex  align-items-center flex-wrap project_requirments_main trip_cash_text'>
            <div className='project_requirments_inner'>
              <p>Diesel Allotted  </p>

              <div className="RequirementLabelCheckbox">
                <Field name='isDieselAllotted' type='radio' value={true} >
                  {({ input }) => (
                    <div className="RequirementTabDFlex">
                      <input
                        {...input}
                        type='radio'
                        id='yes'
                        value={true}
                        onChange={(e) => { input.onChange(true), setDieselAlloted(true) }}
                      />
                      <label className='RequirementTabLabel'>Yes</label>
                    </div>
                  )}
                </Field>

                <Field name='isDieselAllotted' type='radio' value={false}>
                  {({ input }) => (
                    <div className="RequirementTabDFlex">
                      <input
                        {...input}
                        type='radio'
                        id='no'
                        value={false}
                        onChange={(e) => { input.onChange(false), setDieselAlloted(false) }}
                      />
                      <label className='RequirementTabLabel'>No</label>
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <Row>
              <Field name='maxDieselAllotted' >
                {({ input }) => (
                  <Col md={12} >
                    <input
                      {...input}
                      type='text'
                      className='mb-0 form-control'
                      aria-describedby="inputGroupPrepend"
                      placeholder='Enter max. qty in liters'
                      disabled={!isDieselAlloted}
                    />
                  </Col>
                )}
              </Field>

            </Row>
          </div>
          <div className='d-flex align-items-center flex-wrap project_requirments_main '>
            <div className='project_requirments_inner'>
              <p>Cash Allotted  </p>
              <div className="RequirementLabelCheckbox">
                <Field name='isCashAllotted' type='radio' value={true} >
                  {({ input }) => (
                    <div className="RequirementTabDFlex">
                      <input
                        {...input}
                        type='radio'
                        id='yes'
                        value={true}
                        onChange={(e) => { input.onChange(true), setCashAlloted(true) }}
                      />
                      <label className='RequirementTabLabel'>Yes</label>
                    </div>
                  )}
                </Field>
                <Field name='isCashAllotted' type='radio' value={false} >
                  {({ input }) => (
                    <div className="RequirementTabDFlex">
                      <input
                        {...input}
                        type='radio'
                        id='no'
                        value={false}
                        onChange={(e) => { input.onChange(false), setCashAlloted(false) }}
                      />
                      <label className='RequirementTabLabel'>No</label>
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <Row>
              <Field name='maxCashAllotted' >
                {({ input }) => (
                  <Col md={12} >
                    <input
                      {...input}
                      type='text'
                      className='mb-0 form-control'
                      aria-describedby="inputGroupPrepend"
                      placeholder='Enter max. qty in liters'
                      disabled={!isCashAlloted}
                    />
                  </Col>
                )}
              </Field>
            </Row>
          </div>
        </div >
      </div >
      <div className='Project_basic_Detail'>
        <div className='d-flex gap-2 align-items-center'>
          <h2>Documents to be submitted in paper form</h2>
          {errors.isSignedChallan && (touched.isSignedChallan && touched.isWeighbridgeSlip) &&
            <span className='start_icon mb-4'>{errors.isSignedChallan}</span>}
        </div>
        <div className='d-flex align-items-center project_requirments_main project_requirments_inner '>

          <div className='project_requirments_inner'>
            <p>Signed Challan</p>
            <div className='RequirementLabelCheckbox' >
              <Field name='isSignedChallan' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isSignedChallan' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>

          </div>

          <div className='project_requirments_inner'>
            <p>Weighbridge slip</p>

            <div className='RequirementLabelCheckbox' >
              <Field name='isWeighbridgeSlip' type='radio' value={true}>
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={true}
                      onChange={() => input.onChange(true)}
                    />
                    <label className='RequirementTabLabel'>Yes</label>
                  </div>
                )}
              </Field>
              <Field name='isWeighbridgeSlip' type='radio' value={false} >
                {({ input }) => (
                  <div className="RequirementTabDFlex">
                    <input
                      {...input}
                      type='radio'
                      value={false}
                      onChange={() => input.onChange(false)}
                    />
                    <label className='RequirementTabLabel'>No</label>
                  </div>
                )}
              </Field>
            </div>
          </div>

          {/* <Row>
            <Field name='otherDocument1' >
              {({ input }) => (
                <Col md={6} >
                  <input
                    {...input}
                    type='text'
                    className='mb-0 form-control'
                    aria-describedby="inputGroupPrepend"
                    placeholder='Enter max. qty in liters'
                  />
                </Col>
              )}
            </Field>

            <Field name='otherDocument2' >
              {({ input }) => (
                <Col md={6} >
                  <input
                    {...input}
                    type='text'
                    className='mb-0 form-control'
                    aria-describedby="inputGroupPrepend"
                    placeholder='Enter max. qty in liters'
                  />
                </Col>
              )}
            </Field>
          </Row> */}
        </div>
      </div>
      <div className="save_or_next_btn">
        {router.query.id ? <Button type='submit'>Update </Button> : <Button type='submit'>Save & Next</Button>}
      </div>
      </div>
    </>
  )
}
export default Requirment;