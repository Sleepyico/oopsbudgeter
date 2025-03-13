/*
 *   Copyright (c) 2025 Laith Alkhaddam aka Iconical or Sleepyico.
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
"use client";

import { useEffect, useState } from "react";
import InExCard from "../cards/InExCard";
import { useBalance } from "@/contexts/BalanceContext";
import { fetchTransactions } from "@/lib/api";
import { selectTransactionType } from "@/schema/transactionForm";
import { useTransactions } from "@/contexts/TransactionsContext";

export default function Expense() {
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const { currentBalance } = useBalance();
  const { filterTransactions, selectedFilter } = useTransactions();

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        const transactions = await fetchTransactions();

        const expenses = transactions.filter(
          (transaction: selectTransactionType) => transaction.type === "expense"
        );

        const total = expenses.reduce(
          (acc: number, curr: { amount: number }) => acc + curr.amount,
          0
        );

        setTotalExpense(total);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTotalExpenses();
  }, [currentBalance]);

  return (
    <InExCard
      title="Expenses"
      amount={totalExpense}
      onClick={() => filterTransactions("expense")}
      className={`${selectedFilter === "expense" && "bg-red-500"}`}
    />
  );
}
