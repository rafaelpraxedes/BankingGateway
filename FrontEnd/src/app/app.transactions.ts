import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BankingService } from './app.service';
import { Transaction } from './bankingsystem';

@Component({
    selector: 'transactions-list',
    template: 
    		`
            <div class="transactionContainer" onload>
                <h2> Transactions </h2>
                    <table>
                        <tr>
                            <th> Account Id </th>
                            <th> Container </th>
                            <th> Base Type </th>
                            <th> Category </th>
                            <th> Date </th>
                            <th> Amount </th>
                        </tr>
                        <tr *ngFor="let transaction of transactions">
                            <td class="tdNumber"> {{transaction.accountId}} </td>
                            <td> {{transaction.container}} </td>
                            <td> {{transaction.baseType}} </td>
                            <td> {{transaction.category}} </td>
                            <td> {{transaction.transDate}} </td>
                            <td class="tdNumber"> {{transaction.amount}} </td>
                        </tr>
                    </table>
            </div>
            `,
    styleUrls: ['./app.component.css']
})

export class TransactionsComponent {
    @Input() transactions: Transaction[];
}

