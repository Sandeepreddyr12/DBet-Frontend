import React from 'react';

type Props = {};

export default function Details({}: Props) {
  return (
    <div className="w-10/12 m-auto">
      <div className="flex justify-between items-center my-10 space-x-10 flex-wrap sm:flex-nowrap">
        <div className="product-img w-1/2 min-w-min h-96 bg-slate-400 flex">
          <div className="w-1/2">
            <div className="product-img w-full h-24 bg-slate-500">
              {/* <img
            className="w-full h-full object-contain"
            src={data?.category?.image}
            alt={data?.category?.name}
          /> */}
            </div>
            <div>
              <div>player Team stake</div>
              <div>amount</div>
            </div>
            <div>
              <div>Total amount on TeamA</div>
              <div>amount</div>
            </div>
            <div>
              <div>predicted winnings if</div>
              <div>amount</div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="product-img w-full h-24 bg-slate-700">
              {/* <img
            className="w-full h-full object-contain"
            src={data?.category?.image}
            alt={data?.category?.name}
          /> */}
            </div>
            <div>
              <div>player Team stake</div>
              <div>amount</div>
            </div>
            <div>
              <div>Total amount on TeamA</div>
              <h2 className="text-xl font-semibold">&#x20B9; data.price</h2>
              <div>amount</div>
            </div>
            <div>
              <div>predicted winnings if</div>
              <div>amount</div>
            </div>
          </div>
        </div>
        <div className="product-detail w-1/2 space-y-10 justify-self-center">
          <h1 className="text-4xl font-bold">India VS Australia</h1>
          <p>status</p>
          <div>entrance fee</div>

          <div className="w-72 flex flex-col flex-nowrap m-auto">
            <div className="w-full h-10 mb-4">
              <label for="Selecting a Team" className="sr-only">
                Pick a Team
              </label>
              <select
                id="currency"
                name="currency"
                className="h-full w-full rounded-md border-0 bg-slate-200 py-0 pl-2 pr-7 text-gray-900 font-bold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option className="text-black text-center">Pick a Team</option>
                <option className="text-black text-center">India</option>
                <option className="text-black text-center">Australia</option>
              </select>
            </div>
            <div className="custom-number-input h-10 w-full mb-5 ">
              <div className="flex flex-row flex-nowrap h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                  data-action="decrement"
                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                  name="custom-input-number"
                  value="0"
                ></input>
                <button
                  data-action="increment"
                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
                <div className="w-2/5">
                  <label for="currency" className="sr-only">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="h-full rounded-md border-0 bg-slate-200 py-0 pl-2 pr-7 text-gray-900 font-bold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option className="text-black text-center">Eth</option>
                    <option disabled>Bitcoin</option>
                    <option disabled>USD</option>
                    <option disabled>INR</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full ">
              <button className="bg-green-500 text-white w-full px-7 py-2">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
