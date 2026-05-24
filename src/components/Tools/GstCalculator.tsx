"use client";

import { useMemo, useState, useEffect } from "react";

type TaxType = "exclusive" | "inclusive";

type GstCalculationResult = {
  actual: number;
  gstAmount: number;
  total: number;
};

type ProfitCalculationResult = {
  actualCost: number;
  gstPaid: number;
  actualSell: number;
  gstCollected: number;
  profit: number;
  gstPayable: number;
};

function normalizeBaseAmount(amount: number, rate: number, taxType: TaxType) {
  if (taxType === "inclusive") {
    return amount / (1 + rate / 100);
  }

  return amount;
}

function calculateTaxAmount(baseAmount: number, rate: number) {
  return (baseAmount * rate) / 100;
}

export default function GstCalculator() {
  const preventNumberScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  // =========================
  // GST CALCULATOR STATE
  // =========================
  const [amount, setAmount] = useState<string>("");
  const [gst, setGst] = useState<number>(18);
  const [type, setType] = useState<TaxType>("exclusive");

  // =========================
  // PROFIT CALCULATOR STATE
  // =========================
  const [cost, setCost] = useState<string>("");
  const [costGst, setCostGst] = useState<number>(18);
  const [costType, setCostType] = useState<TaxType>("exclusive");

  const [sell, setSell] = useState<string>("");
  const [sellGst, setSellGst] = useState<number>(18);
  const [sellType, setSellType] = useState<TaxType>("exclusive");


  // =========================
  // GST CALCULATION
  // =========================
  const gstResult: GstCalculationResult = useMemo(() => {
    const numericAmount = Number(amount);

    if (!amount || isNaN(numericAmount)) {
      return {
        actual: 0,
        gstAmount: 0,
        total: 0,
      };
    }

    if (type === "exclusive") {
      const gstAmount = calculateTaxAmount(numericAmount, gst);

      return {
        actual: numericAmount,
        gstAmount,
        total: numericAmount + gstAmount,
      };
    }

    const actual = normalizeBaseAmount(
      numericAmount,
      gst,
      "inclusive"
    );

    const gstAmount = numericAmount - actual;

    return {
      actual,
      gstAmount,
      total: numericAmount,
    };
  }, [amount, gst, type]);

  // =========================
  // PROFIT CALCULATION
  // =========================
  const profitResult: ProfitCalculationResult = useMemo(() => {
    const numericCost = Number(cost);
    const numericSell = Number(sell);

    // Cost is required
    if (!cost || isNaN(numericCost)) {
      return {
        actualCost: 0,
        gstPaid: 0,
        actualSell: 0,
        gstCollected: 0,
        profit: 0,
        gstPayable: 0,
      };
    }

    // BUY
    const actualCost = normalizeBaseAmount(
      numericCost,
      costGst,
      costType
    );

    const gstPaid =
      costType === "inclusive"
        ? numericCost - actualCost
        : calculateTaxAmount(numericCost, costGst);

    // SELL (optional)
    const hasSell =
      sell !== "" &&
      !isNaN(numericSell);

    const actualSell = hasSell
      ? normalizeBaseAmount(
        numericSell,
        sellGst,
        sellType
      )
      : 0;

    const gstCollected = hasSell
      ? (
        sellType === "inclusive"
          ? numericSell - actualSell
          : calculateTaxAmount(numericSell, sellGst)
      )
      : 0;

    const profit = hasSell
      ? actualSell - actualCost
      : 0;

    const gstPayable = hasSell
      ? gstCollected - gstPaid
      : 0;

    return {
      actualCost,
      gstPaid,
      actualSell,
      gstCollected,
      profit,
      gstPayable,
    };
  }, [
    cost,
    costGst,
    costType,
    sell,
    sellGst,
    sellType,
  ]);

  // =========================
  // PROFIT PLANNER STATE & LOGIC
  // =========================
  const [targetProfitPercent, setTargetProfitPercent] = useState<string>("");
  const [targetProfitAmount, setTargetProfitAmount] = useState<string>("");

  const handleTargetPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTargetProfitPercent(val);
    const p = Number(val);
    if (!val || isNaN(p) || profitResult.actualCost <= 0) {
      setTargetProfitAmount("");
      return;
    }
    const amt = (profitResult.actualCost * p) / 100;
    setTargetProfitAmount(amt.toFixed(2));

    // Drive the main calculator by updating the sell state
    const baseTargetSell = profitResult.actualCost + amt;
    const finalSell = sellType === "inclusive"
      ? baseTargetSell * (1 + sellGst / 100)
      : baseTargetSell;
    setSell(finalSell.toFixed(2));
  };

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTargetProfitAmount(val);
    const amt = Number(val);
    if (!val || isNaN(amt) || profitResult.actualCost <= 0) {
      setTargetProfitPercent("");
      return;
    }
    const p = (amt / profitResult.actualCost) * 100;
    setTargetProfitPercent(p.toFixed(2));

    // Drive the main calculator by updating the sell state
    const baseTargetSell = profitResult.actualCost + amt;
    const finalSell = sellType === "inclusive"
      ? baseTargetSell * (1 + sellGst / 100)
      : baseTargetSell;
    setSell(finalSell.toFixed(2));
  };

  const recommendedSellPrice = useMemo(() => {
    if (!targetProfitAmount || isNaN(Number(targetProfitAmount))) return 0;
    const baseTargetSell = profitResult.actualCost + Number(targetProfitAmount);
    return sellType === "inclusive"
      ? baseTargetSell * (1 + sellGst / 100)
      : baseTargetSell;
  }, [profitResult.actualCost, targetProfitAmount, sellType, sellGst]);

  // Synchronize Profit Planner inputs with the actual calculator results in real time
  useEffect(() => {
    if (profitResult.actualCost > 0) {
      const p = (profitResult.profit / profitResult.actualCost) * 100;
      const amt = profitResult.profit;

      // Only sync if the current planner state is significantly different from actual results.
      // This prevents the sync logic from "fighting" the user's manual typing in the planner fields.
      if (Math.abs(Number(targetProfitPercent) - p) > 0.01) {
        setTargetProfitPercent(p.toFixed(2));
      }
      if (Math.abs(Number(targetProfitAmount) - amt) > 0.01) {
        setTargetProfitAmount(amt.toFixed(2));
      }
    } else {
      setTargetProfitPercent("");
      setTargetProfitAmount("");
    }
  }, [profitResult.profit, profitResult.actualCost, targetProfitPercent, targetProfitAmount]);


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans pt-2 grid-bg">
      <main className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-3">
          {/* ========================= GST CALCULATOR ========================= */}
          <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 py-2 sm:px-10 sm:py-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-center items-center">
                <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight">
                  GST <span className="text-[#3A9B9B]">Calculator</span>
                </h1>
              </div>
            </div>

            <div className="p-3 pt-2 sm:p-10 sm:pt-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onWheel={preventNumberScroll}
                  />
                </div>

                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    GST %
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={gst}
                    onChange={(e) => setGst(Number(e.target.value))}
                  >
                    {[0, 5, 12, 18, 28].map((g) => (
                      <option key={g} value={g}>
                        {g}%
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Tax Type
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={type}
                    onChange={(e) => { setType(e.target.value as TaxType); }}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[9px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                    Actual Amount
                  </p>
                  <p className="mt-0.5 text-xs sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{gstResult.actual.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[9px] sm:text-xs text-[#3A9B9B]">GST Amount</p>
                  <p className="mt-0.5 text-xs sm:text-base font-bold tracking-tight text-[#3A9B9B]">
                    ₹{gstResult.gstAmount.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl border-none bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] p-2 sm:p-4 text-center shadow-lg shadow-[#3A9B9B]/20">
                  <p className="text-[9px] sm:text-xs text-teal-50 font-bold">Total Amount</p>
                  <p className="mt-0.5 text-sm sm:text-xl font-black tracking-tighter text-white">
                    ₹{gstResult.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= PROFIT CALCULATOR ========================= */}
          <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm px-4 py-1.5 sm:px-10 sm:py-3">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-center items-center">
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight">
                  Profit <span className="text-[#3A9B9B]">Calculator</span>
                </h1>
              </div>
            </div>

            <div className="p-3 pt-2 sm:p-6 lg:p-8">
              <div className="grid gap-2 sm:gap-4 md:gap-6">
                {/* BUY ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 items-stretch">
                  <div className="flex h-[60px] items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus-within:border-[#3A9B9B] focus-within:ring-2 focus-within:ring-[#3A9B9B]/20 transition-all duration-300 overflow-hidden group">
                    <div className="flex items-center justify-center w-[60px] shrink-0 bg-[#5BBD4A]/8 text-[#5BBD4A] font-bold text-[10px] uppercase border-r border-zinc-100 dark:border-zinc-800/50 transition-colors group-focus-within:bg-[#5BBD4A]/12">
                      Buy
                    </div>
                    <div className="flex-1 px-3 flex flex-col justify-center">
                      <label className="block text-[8px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-transparent text-sm font-bold text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 leading-none"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        onWheel={preventNumberScroll}
                      />
                    </div>
                  </div>

                  <div className="flex h-[60px] items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center justify-center w-[60px] shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
                      <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        GST%
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-around px-2">
                      {[0, 5, 18, 40].map((rate) => (
                        <label key={`buy-rate-${rate}`} className="cursor-pointer flex flex-col items-center gap-1 group">
                          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-[#3A9B9B] transition-colors leading-none">
                            {rate}%
                          </span>
                          <div className="relative flex items-center justify-center w-3.5 h-3.5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-[#3A9B9B] transition-colors">
                            <input
                              type="radio"
                              name="buy-gst"
                              value={rate}
                              checked={costGst === rate}
                              onChange={() => setCostGst(rate)}
                              className="peer sr-only"
                            />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3A9B9B] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex h-[60px] items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center justify-center w-[60px] shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
                      <span className="text-[10px] font-bold text-center leading-tight text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        Type
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-around px-4">
                      {[
                        { label: "Extra", value: "exclusive" },
                        { label: "Incl.", value: "inclusive" }
                      ].map((t) => (
                        <label key={`buy-type-${t.value}`} className="cursor-pointer flex flex-col items-center gap-1 group">
                          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-[#3A9B9B] transition-colors leading-none">
                            {t.label}
                          </span>
                          <div className="relative flex items-center justify-center w-3.5 h-3.5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-[#3A9B9B] transition-colors">
                            <input
                              type="radio"
                              name="buy-type"
                              value={t.value}
                              checked={costType === t.value}
                              onChange={() => setCostType(t.value as TaxType)}
                              className="peer sr-only"
                            />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3A9B9B] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:hidden h-px w-full bg-zinc-200 dark:bg-zinc-800/50" />

                {/* SELL ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 items-stretch">
                  <div className="flex h-[60px] items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus-within:border-[#3A9B9B] focus-within:ring-2 focus-within:ring-[#3A9B9B]/20 transition-all duration-300 overflow-hidden group">
                    <div className="flex items-center justify-center w-[60px] shrink-0 bg-[#F43F5E]/8 text-[#F43F5E] font-bold text-[10px] uppercase border-r border-zinc-100 dark:border-zinc-800/50 transition-colors group-focus-within:bg-[#F43F5E]/12">
                      Sell
                    </div>
                    <div className="flex-1 px-3 flex flex-col justify-center">
                      <label className="block text-[8px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-transparent text-sm font-bold text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 leading-none"
                        value={sell}
                        onChange={(e) => setSell(e.target.value)}
                        onWheel={preventNumberScroll}
                      />
                    </div>
                  </div>

                  <div className="flex h-[60px] items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center justify-center w-[60px] shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
                      <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        GST%
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-around px-2">
                      {[0, 5, 18, 40].map((rate) => (
                        <label key={`sell-rate-${rate}`} className="cursor-pointer flex flex-col items-center gap-1 group">
                          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-[#3A9B9B] transition-colors leading-none">
                            {rate}%
                          </span>
                          <div className="relative flex items-center justify-center w-3.5 h-3.5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-[#3A9B9B] transition-colors">
                            <input
                              type="radio"
                              name="sell-gst"
                              value={rate}
                              checked={sellGst === rate}
                              onChange={() => setSellGst(rate)}
                              className="peer sr-only"
                            />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3A9B9B] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex h-[60px] items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center justify-center w-[60px] shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
                      <span className="text-[10px] font-bold text-center leading-tight text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        Type
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-around px-4">
                      {[
                        { label: "Extra", value: "exclusive" },
                        { label: "Incl.", value: "inclusive" }
                      ].map((t) => (
                        <label key={`sell-type-${t.value}`} className="cursor-pointer flex flex-col items-center gap-1 group">
                          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-[#3A9B9B] transition-colors leading-none">
                            {t.label}
                          </span>
                          <div className="relative flex items-center justify-center w-3.5 h-3.5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-[#3A9B9B] transition-colors">
                            <input
                              type="radio"
                              name="sell-type"
                              value={t.value}
                              checked={sellType === t.value}
                              onChange={() => setSellType(t.value as TaxType)}
                              className="peer sr-only"
                            />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3A9B9B] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RESULTS GRID */}
                <div className="flex flex-col gap-2 sm:gap-3 items-stretch">
                  {/* ROWS 1 & 2 */}
                  <div className="grid grid-cols-3 auto-rows-fr gap-2 sm:gap-3">
                    {/* ROW 1: BUY */}
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center items-center h-full w-full">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest leading-tight">
                            Base Buy Price
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                            ₹{profitResult.actualCost.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center items-center h-full w-full">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest leading-tight">
                            GST Paid
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                            ₹{profitResult.gstPaid.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center items-center h-full w-full">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest leading-tight">
                            Seller Pays
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                            ₹{(profitResult.actualCost + profitResult.gstPaid).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ROW 2: SELL */}
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center items-center h-full w-full">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest leading-tight">
                            Base Sell Price
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                            ₹{profitResult.actualSell.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center items-center h-full w-full">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest leading-tight">
                            GST Collected
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                            ₹{profitResult.gstCollected.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center items-center h-full w-full">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest leading-tight">
                            Customer Pays
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                            ₹{(profitResult.actualSell + profitResult.gstCollected).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUMMARY ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-2 sm:gap-3">
                    {/* Profit % Input Card */}
                    <div className={`relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[90px] flex flex-col justify-center items-center h-full w-full focus-within:border-[#3A9B9B] focus-within:ring-2 focus-within:ring-[#3A9B9B]/20 ${profitResult.actualCost <= 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full w-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest leading-tight">
                            Profit %
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <input
                            type="string"
                            placeholder="0.00"
                            className="w-12 sm:w-20 bg-transparent text-sm sm:text-xl font-black tracking-tight text-[#3A9B9B] outline-none text-right placeholder:text-[#3A9B9B]/40"
                            value={targetProfitPercent}
                            onChange={handleTargetPercentChange}
                            disabled={profitResult.actualCost <= 0}
                            onWheel={preventNumberScroll}
                          />
                          <span className="text-sm sm:text-xl font-black tracking-tight text-[#3A9B9B] ml-0.5">
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Net Profit */}
                    <div className={`relative overflow-hidden rounded-xl border-none transition-all duration-500 p-2 sm:p-3 text-center shadow-lg min-h-[90px] flex flex-col justify-center items-center h-full w-full ${profitResult.profit < 0
                      ? "bg-gradient-to-r from-[#F43F5E] to-[#E11D48] shadow-[#F43F5E]/20"
                      : profitResult.profit > 0
                        ? "bg-gradient-to-r from-[#5BBD4A] to-[#4A9D3B] shadow-[#5BBD4A]/20"
                        : "bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] shadow-[#3A9B9B]/20"
                      }`}>
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-white/90 font-black uppercase tracking-widest leading-tight">
                            {profitResult.profit < 0 ? "Net Loss" : "Net Profit"}
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tighter text-white whitespace-nowrap">
                            ₹{Math.abs(profitResult.profit).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* GST Payable */}
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2 sm:p-3 text-center hover:shadow-md transition-all duration-300 min-h-[90px] flex flex-col justify-center items-center h-full w-full">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-[28px] sm:h-[32px] flex items-center justify-center text-center max-w-[100px]">
                          <p className="text-[8px] sm:text-[10px] text-[#3A9B9B] font-black uppercase tracking-widest leading-tight">
                            GST Payable
                          </p>
                        </div>
                        <div className="mt-1 min-h-[24px] flex items-center justify-center">
                          <p className="text-sm sm:text-xl font-black tracking-tight text-[#3A9B9B] whitespace-nowrap">
                            ₹{profitResult.gstPayable.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= USER GUIDE ========================= */}
          <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-5 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="text-center">

              <h2 className="mt-2 text-xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                <span className="text-[#3A9B9B]">User Guide </span>
              </h2>
            </div>

            <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">1</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Enter Amount</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Input the product or service amount in the calculator&apos;s price field.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">2</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Select GST %</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Choose the correct slab (5%, 12%, 18%, or 28%) for your product category.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">3</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Tax Type</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Select <strong className="text-zinc-800 dark:text-zinc-200">Inclusive</strong> if price has tax, or <strong className="text-zinc-800 dark:text-zinc-200">Exclusive</strong> if tax is extra.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">4</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Review Results</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Instantly view your <strong className="text-zinc-800 dark:text-zinc-200">Net Profit</strong> and net <strong className="text-zinc-800 dark:text-zinc-200">GST Payable</strong> after claiming input tax credit.
                </p>
              </div>
            </div>

            {/* Pro Insights Grid */}
            <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-8 backdrop-blur-md">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#3A9B9B]" />
                <div className="flex items-start gap-4">
                  <div className="text-2xl sm:text-3xl">🔄</div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Input Tax Credit (ITC)</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                      Businesses can reduce their GST liability by claiming credit for GST already paid on purchases. The calculator shows <strong className="text-[#3A9B9B]">GST Payable</strong> by subtracting GST Paid from GST Collected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-8 backdrop-blur-md">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#5BBD4A]" />
                <div className="flex items-start gap-4">
                  <div className="text-2xl sm:text-3xl">📈</div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Profit Maximization Tip</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                      Always calculate margins on the <strong className="text-[#5BBD4A]">base amount before GST</strong>. Tax collected is a liability to the government, not part of your business&apos;s operational profit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Section */}
            <div className="mt-8 sm:mt-12 rounded-[1.5rem] sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white/20 dark:bg-zinc-900/20 p-4 sm:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">Example Calculation</p>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <div className="lg:w-72 shrink-0">
                    <span className="inline-block rounded-full bg-[#3A9B9B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#3A9B9B]">Exclusive GST</span>
                    <p className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 + 18% GST</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Tax is added to the base price. Customer pays ₹118.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                    <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-center">
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase">Base</p>
                      <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">₹100</p>
                    </div>
                    <div className="rounded-xl border border-[#3A9B9B]/20 bg-white dark:bg-zinc-900 p-4 text-center">
                      <p className="text-[10px] text-[#3A9B9B] font-bold uppercase">GST (18%)</p>
                      <p className="text-lg font-black text-[#3A9B9B]">₹18</p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-4 text-center">
                      <p className="text-[10px] text-teal-100 font-bold uppercase">Total</p>
                      <p className="text-lg font-black text-white">₹118</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <div className="lg:w-72 shrink-0">
                    <span className="inline-block rounded-full bg-[#2D3561]/10 dark:bg-[#2D3561]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#2D3561] dark:text-indigo-300">Inclusive GST</span>
                    <p className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 (Tax Included)</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Tax is already inside the price. Base value is extracted.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                    <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-center">
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase">Base</p>
                      <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">₹84.75</p>
                    </div>
                    <div className="rounded-xl border border-[#3A9B9B]/20 bg-white dark:bg-zinc-900 p-4 text-center">
                      <p className="text-[10px] text-[#3A9B9B] font-bold uppercase">GST (18%)</p>
                      <p className="text-lg font-black text-[#3A9B9B]">₹15.25</p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-4 text-center">
                      <p className="text-[10px] text-teal-100 font-bold uppercase">Total</p>
                      <p className="text-lg font-black text-white">₹100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Points */}
            <div className="mt-8 sm:mt-12 p-6 sm:p-10 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3A9B9B]" />
                Quick Summary
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">Inclusive:</strong> GST is already included in the amount.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">Exclusive:</strong> GST is added separately to the price.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">ITC:</strong> Claim credit for GST paid on business purchases.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">GST Payable:</strong> Calculated as Collected − Paid.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">Calculations:</strong> Always base profit on pre-GST figures.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= FEEDBACK SECTION ========================= */}
          <div className="mt-10 sm:mt-16 text-center">
            <p className="text-lg sm:text-xl font-medium text-zinc-500/70 dark:text-zinc-500/70">
              Have suggestions?

              <span className="block sm:inline sm:ml-1">
                Write to{" "}
                <a
                  href="mailto:info@banavatnest.com"
                  className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-300"
                >
                  info@banavatnest.com
                </a>
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
