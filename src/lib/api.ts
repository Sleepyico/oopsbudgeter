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

import { selectTransactionType } from "@/schema/transactionForm";

export const fetchTransactions = async (): Promise<selectTransactionType[]> => {
  try {
    const response = await fetch("/api/transactions");
    if (!response.ok) throw new Error("Failed to fetch transactions");

    const data = await response.json();
    return data.transactions;
  } catch (error) {
    console.error("🔴 Error fetching transactions:", error);
    return [];
  }
};
