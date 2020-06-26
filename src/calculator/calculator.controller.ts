import { Controller, Get, ParseIntPipe, Param } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { GrpcMethod } from '@nestjs/microservices';
import { calculator } from 'src/api/v1/rpc';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('fibo/:order')
  getFibonacci(@Param('order', ParseIntPipe) order: number): number {
    return this.calculatorService.fibonacci(order);
  }

  @Get('fibo/faster/:order')
  getFibonacciFaster(@Param('order', ParseIntPipe) order: number): number {
    return this.calculatorService.fibonacciFaster(order);
  }

  @Get('fibo/fastest/:order')
  getFibonacciFastest(@Param('order', ParseIntPipe) order: number): number {
    return this.calculatorService.fibonacciFastest(order);
  }

  @GrpcMethod('CalculatorService', 'Fibonacci')
  rpcFibonacci(data: calculator.FibonacciReq): calculator.IFibonacciRes {
    return {
      number: this.calculatorService.fibonacci(data.order),
    };
  }

  @GrpcMethod('CalculatorService', 'FibonacciFaster')
  rpcFibonacciFaster(data: calculator.FibonacciReq): calculator.IFibonacciRes {
    return {
      number: this.calculatorService.fibonacciFaster(data.order),
    };
  }

  @GrpcMethod('CalculatorService', 'FibonacciFastest')
  rpcFibonacciFastest(data: calculator.FibonacciReq): calculator.IFibonacciRes {
    return {
      number: this.calculatorService.fibonacciFastest(data.order),
    };
  }
}
