import { Col, Form, Input, Row } from "antd";
import React from "react";
import InputNumberCustom from "./InputNumberCustom";

const ValidateFromTo = () => {
  return (
    <div>
      <Row>
        <Col>
          <Row>
            <Form.Item
              name="form_one"
              label={<div>Form</div>}
              rules={[
                ({ getFieldValue, setFields }) => ({
                  validator(_, value) {
                    const valueEnd = getFieldValue("from_two");
                    if (valueEnd) {
                      setFields([
                        { name: "from_two", errors: undefined },
                      ]);
                    } else {
                      setFields([
                        {
                          name: "from_two",
                          errors: ["requiredMessage"],
                        },
                      ]);
                    }
                    if (!value) {
                      return Promise.reject(new Error("requiredMessage"));
                    }
                    if (+value > +valueEnd) {
                      return Promise.reject(new Error("startEndMessage"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumberCustom isConvertCurrency />
            </Form.Item>
            <div>～</div>
          </Row>
        </Col>
        <Col>
          <Row>
            <Form.Item
              name="from_two"
              label={<div>&nbsp;</div>}
              rules={[
                ({ getFieldValue, setFields }) => ({
                  validator(_, value) {
                    const valueStart = getFieldValue("form_one");
                    if (valueStart) {
                      setFields([
                        { name: "form_one", errors: undefined },
                      ]);
                    } else {
                      setFields([
                        {
                          name: "form_one",
                          errors: ["requiredMessage"],
                        },
                      ]);
                    }
                    if (!value) {
                      return Promise.reject(new Error("requiredMessage"));
                    }
                    if (+value < +valueStart) {
                      return Promise.reject(new Error("startEndMessage"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumberCustom  isConvertCurrency/>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ValidateFromTo;
